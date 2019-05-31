import React, { Component } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import reset from 'styled-reset';
import queryString from 'query-string';
import global from '../styles/global';
import Button from '../components/Button';
import Poster from '../components/Poster';
import Select from '../components/Select';
import Footer from '../components/Footer';
import { ETimeRange, timeRanges } from 'types/general';
import { connect } from 'react-redux';
import { spotifyActions, songkickActions } from 'redux/actions';
import { IState } from 'redux/reducers';
import { spotifyApi } from 'api/spotify.api';
import idx from 'idx';
import branding from 'styles/branding';
import { LoginWrap, Filters, Actions } from './App.styled';
import Overlay from 'components/Overlay';

const GlobalStyle = createGlobalStyle`
  ${reset}
  ${global}
`;

type TProps = {
  getUserDetailsStart: () => void;
  getAccessToken: () => void;
  createPlaylistStart: (artists: SpotifyApi.ArtistObjectFull[]) => void;
  getTopArtistsStart: (timeRange: ETimeRange) => void;
  getConcertsStart: (timeRange: ETimeRange) => void;
  user: IState['user'];
  artists: IState['artists'];
  createPlaylistState: IState['createPlaylist'];
};

type TState = {
  timeRange: ETimeRange;
};

class App extends Component<TProps, TState> {
  constructor(props: TProps) {
    super(props);
    this.state = {
      timeRange: ETimeRange.medium,
    };
  }

  componentDidMount = () => {
    const parsedUrl = queryString.parse(window.location.hash);
    spotifyApi.setAccessToken(String(parsedUrl.access_token));

    if (!!parsedUrl.access_token) {
      this.props.getUserDetailsStart();
      this.props.getTopArtistsStart(this.state.timeRange);
    }
  };

  render() {
    const { timeRange } = this.state;
    const {
      user,
      artists,
      getTopArtistsStart,
      createPlaylistStart,
      getAccessToken,
      createPlaylistState,
      getConcertsStart,
    } = this.props;

    console.log(timeRange);

    return (
      <ThemeProvider theme={branding}>
        <>
          <GlobalStyle />
          {user.value === null ? (
            <LoginWrap>
              <Button onClick={getAccessToken} buttonStyle="spotify">
                Login with Spotify
              </Button>
            </LoginWrap>
          ) : (
            <>
              <Filters>
                <Select
                  label="Time Range"
                  items={timeRanges}
                  onChange={timeRange => {
                    if (artists[timeRange as ETimeRange].value.length === 0)
                      getTopArtistsStart(timeRange as ETimeRange);
                    this.setState({ timeRange: timeRange as ETimeRange });
                  }}
                  initialIndex={1}
                />

                <button onClick={() => getConcertsStart(timeRange)}>turn off dream mode</button>
              </Filters>

              <Poster
                username={idx(user, _ => _.value.display_name)}
                artists={artists[timeRange]}
                timeRange={timeRange}
              />
              {createPlaylistState.isLoading && <Overlay text="Creating Playlist..." />}
              <Actions>
                <Button
                  onClick={() =>
                    !!artists[timeRange].value && createPlaylistStart(artists[timeRange].value!)
                  }
                  buttonStyle="normal"
                  disabled={!artists[timeRange].value}
                  title="Create a playlist containing recommendations based on your top artists."
                >
                  Generate Playlist
                </Button>
                {/* <Button onClick={() => window.alert('Coming soon')} buttonStyle="normal">
                  Save as image
                </Button> */}
              </Actions>
              <Footer />
            </>
          )}
        </>
      </ThemeProvider>
    );
  }
}

export default connect(
  ({ user, artists, createPlaylist: createPlaylistState }: IState) => ({
    user,
    artists,
    createPlaylistState,
  }),
  {
    getUserDetailsStart: spotifyActions.getUserDetailsStart,
    getTopArtistsStart: spotifyActions.getTopArtistsStart,
    getConcertsStart: songkickActions.getConcertsStart,
    createPlaylistStart: spotifyActions.createPlaylistStart,
    getAccessToken: spotifyActions.getAccessToken,
  },
)(App);
