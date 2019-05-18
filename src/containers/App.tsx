import React, { Component } from 'react';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import queryString from 'query-string';
import { BACKEND_URLS } from '../config/constants';
import global from '../styles/global';
import Button from '../components/Button';
import Poster from '../components/Poster';
import TabBar from '../components/TabBar';
import Footer from '../components/Footer';
import { ETimeRange, ESortCriteria } from 'types/general';
import { connect } from 'react-redux';
import { getUserDetailsStart, getTopArtistsStart } from 'redux/actions';
import { IState } from 'redux/reducers';
import { spotifyApi } from 'api/spotify.api';
import idx from 'idx';

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
      timeRange: ETimeRange.long,
      sortCriteria: ESortCriteria.calculated,
    };
  }

  componentDidMount = () => {
    const parsedUrl = queryString.parse(window.location.search);
    spotifyApi.setAccessToken(String(parsedUrl.access_token));
    this.props.getUserDetailsStart();
    this.props.getTopArtistsStart(ETimeRange.long);
  };

  handleLogin = () =>
    ((window.location as any) = window.location.href.includes('localhost')
      ? BACKEND_URLS.LOCAL
      : BACKEND_URLS.PROD);

  render() {
    const { timeRange, sortCriteria } = this.state;
    const { user, artists, getTopArtistsStart } = this.props;

    return (
      <>
        <GlobalStyle />
        {user.value === null ? (
          <div
            style={{
              width: '100vw',
              height: '100vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button onClick={this.handleLogin} text="Login with Spotify" />
          </div>
        ) : (
          <>
            <TabBar
              items={Object.values(ETimeRange)}
              onChange={(timeRange: any) => {
                if (!artists[timeRange as ETimeRange].value) getTopArtistsStart(timeRange);
                this.setState({ timeRange });
              }}
              initialValue={timeRange}
            />
            <TabBar
              items={Object.values(ESortCriteria)}
              onChange={(sortCriteria: any) => this.setState({ sortCriteria })}
              initialValue={sortCriteria}
            />

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
    );
  }
}

export default connect(
  ({ user, artists }: IState) => ({ user, artists }),
  { getUserDetailsStart, getTopArtistsStart },
)(App);
