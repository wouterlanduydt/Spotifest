import React, { Component } from 'react';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import queryString from 'query-string';
import { BACKEND_URLS, DEFAULT_BG } from '../config/constants';
import global from '../styles/global';
import { backgroundColors } from '../styles/branding';
import Button from '../components/Button';
import Poster from '../components/Poster';
import TimeRangeSelector from '../components/TimeRangeSelector';
import ColorSelector from '../components/ColorSelector';
import Footer from '../components/Footer';
import { ETimeRange } from 'types/general';
import { connect } from 'react-redux';
import { getUserDetailsStart, getTopArtistsStart } from 'redux/actions';
import { IState } from 'redux/reducers';
import { spotifyApi } from 'api/spotify.api';

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
  backgroundColor: string;
  timeRange: ETimeRange;
};

class App extends Component<TProps, TState> {
  constructor(props: TProps) {
    super(props);
    this.state = {
      backgroundColor: backgroundColors[0],
      timeRange: ETimeRange.long,
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
    const { backgroundColor, timeRange } = this.state;
    const { user, artists } = this.props;

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
            <TimeRangeSelector
              setTimeRange={(timeRange: ETimeRange) => this.setState({ timeRange })}
              timeRange={timeRange}
            />
            <ColorSelector
              backgroundColors={backgroundColors}
              selectedColor={backgroundColor}
              onButtonClick={(backgroundColor: string) => this.setState({ backgroundColor })}
            />
            <Poster
              backgroundColor={backgroundColor}
              profilePictureUrl={
                (this.props.user.value &&
                  this.props.user.value.images &&
                  this.props.user.value.images[0].url) ||
                DEFAULT_BG
              }
              artists={artists[timeRange]}
            />
            <Footer color={backgroundColor} />
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
