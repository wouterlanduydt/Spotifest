import React, { Component } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import reset from 'styled-reset';
import queryString from 'query-string';
import { BACKEND_URLS } from '../config/constants';
import global from '../styles/global';
import Button from '../components/Button';
import Poster from '../components/Poster';
import Select from '../components/Select';
import Footer from '../components/Footer';
import { ETimeRange, ESortCriteria, timeRanges } from 'types/general';
import { connect } from 'react-redux';
import { getUserDetailsStart, getTopArtistsStart } from 'redux/actions';
import { IState } from 'redux/reducers';
import { spotifyApi } from 'api/spotify.api';
import idx from 'idx';
import branding from 'styles/branding';
import { LoginWrap, Filters } from './App.styled';

const GlobalStyle = createGlobalStyle`
  ${reset}
  ${global}
`;

type TProps = {
  getUserDetailsStart: () => void;
  getTopArtistsStart: (timeRange: ETimeRange) => void;
  user: IState['user'];
  artists: IState['artists'];
};

type TState = {
  timeRange: ETimeRange;
  sortCriteria: ESortCriteria;
};

class App extends Component<TProps, TState> {
  constructor(props: TProps) {
    super(props);
    this.state = {
      timeRange: ETimeRange.medium,
      sortCriteria: ESortCriteria.calculated,
    };
  }

  componentDidMount = () => {
    const parsedUrl = queryString.parse(window.location.search);
    spotifyApi.setAccessToken(String(parsedUrl.access_token));
    this.props.getUserDetailsStart();
    this.props.getTopArtistsStart(this.state.timeRange);
  };

  handleLogin = () =>
    ((window.location as any) = window.location.href.includes('localhost')
      ? BACKEND_URLS.LOCAL
      : BACKEND_URLS.PROD);

  render() {
    const { timeRange, sortCriteria } = this.state;
    const { user, artists, getTopArtistsStart } = this.props;

    return (
      <ThemeProvider theme={branding}>
        <>
          <GlobalStyle />
          {user.value === null ? (
            <LoginWrap>
              <Button onClick={this.handleLogin} text="Login with Spotify" />
            </LoginWrap>
          ) : (
            <>
              <Filters>
                <Select
                  label="Time Range"
                  items={timeRanges}
                  onChange={timeRange => {
                    if (!artists[timeRange as ETimeRange].value)
                      getTopArtistsStart(timeRange as ETimeRange);
                    this.setState({ timeRange: timeRange as ETimeRange });
                  }}
                  initialIndex={1}
                />

                <Select
                  label="Sort By"
                  items={Object.values(ESortCriteria).map(i => ({ value: i, label: i }))}
                  onChange={sortCriteria =>
                    this.setState({ sortCriteria: sortCriteria as ESortCriteria })
                  }
                />
              </Filters>

              <Poster
                username={idx(user, _ => _.value.display_name)}
                artists={artists[timeRange]}
                sortCriteria={sortCriteria}
                timeRange={timeRange}
              />
              <Footer />
            </>
          )}
        </>
      </ThemeProvider>
    );
  }
}

export default connect(
  ({ user, artists }: IState) => ({ user, artists }),
  { getUserDetailsStart, getTopArtistsStart },
)(App);
