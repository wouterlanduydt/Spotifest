import React, { Component } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import reset from 'styled-reset';
import queryString from 'query-string';
import global from '../styles/global';
import { Button, Poster, Select, Footer, Overlay, ConcertList } from '../components';
import { ETimeRange, timeRanges } from 'types/general';
import { connect } from 'react-redux';
import { spotifyActions, songkickActions } from 'redux/actions';
import { IState } from 'redux/reducers';
import { spotifyApi } from 'api/spotify.api';
import idx from 'idx';
import branding from 'styles/branding';
import { LoginWrap, Filters, Actions } from './App.styled';
import { getUserLocation, filterConcertsByDistance } from 'lib';

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
  concerts: IState['concerts'];
  createPlaylistState: IState['createPlaylist'];
};

type TState = {
  timeRange: ETimeRange;
  concertMode: boolean;
  userCoords: Position['coords'] | undefined;
  concertRange: number;
};

class App extends Component<TProps, TState> {
  constructor(props: TProps) {
    super(props);
    this.state = {
      timeRange: ETimeRange.medium,
      concertMode: false,
      userCoords: undefined,
      concertRange: 100,
    };
  }

  componentDidMount = () => {
    const { getUserDetailsStart, getTopArtistsStart } = this.props;

    const parsedUrl = queryString.parse(window.location.hash);
    spotifyApi.setAccessToken(String(parsedUrl.access_token));

    if (!!parsedUrl.access_token) {
      getUserDetailsStart();
      getTopArtistsStart(this.state.timeRange);
    }
  };

  onChangeTimeRange = (timeRange: string) => {
    const { artists, getTopArtistsStart } = this.props;

    if (artists[timeRange as ETimeRange].value.length === 0)
      getTopArtistsStart(timeRange as ETimeRange);
    this.setState({ timeRange: timeRange as ETimeRange });
  };

  toggleConcertMode = () => {
    const { timeRange, concertMode, userCoords } = this.state;

    if (!userCoords) {
      getUserLocation()
        .then(({ coords: userCoords }) => this.setState({ userCoords }))
        .catch(e => console.log(e));
    }
    if (!concertMode) this.props.getConcertsStart(timeRange);
    this.setState({ concertMode: !concertMode });
  };

  render() {
    const { timeRange, concertMode, userCoords, concertRange } = this.state;
    const {
      user,
      artists,
      concerts,
      createPlaylistStart,
      getAccessToken,
      createPlaylistState,
    } = this.props;

    const nearbyConcerts = filterConcertsByDistance(concerts, userCoords, concertRange);

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
                <div className="filter-main-btns">
                  <Select
                    label="Time Range"
                    items={timeRanges}
                    onChange={this.onChangeTimeRange}
                    initialIndex={1}
                  />
                  <button onClick={this.toggleConcertMode}>
                    turn {concertMode ? 'off' : 'on'} concertMode
                  </button>
                </div>
                {concertMode && (
                  <div className="filter-concert-ranges">
                    <button onClick={() => this.setState({ concertRange: 50 })}>50km </button>
                    <button onClick={() => this.setState({ concertRange: 100 })}>100km </button>
                    <button onClick={() => this.setState({ concertRange: 250 })}>250km </button>
                    <button onClick={() => this.setState({ concertRange: 500 })}>500km </button>
                    <button onClick={() => this.setState({ concertRange: 99999999 })}>
                      Everywhere
                    </button>
                  </div>
                )}
              </Filters>

              <Poster
                username={idx(user, _ => _.value.display_name)}
                artists={artists[timeRange]}
                timeRange={timeRange}
                concertMode={concertMode}
                concerts={nearbyConcerts}
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
                  Generate Recommendations Playlist
                </Button>
                {/* <Button onClick={() => window.alert('Coming soon')} buttonStyle="normal">
                  Save as image
                </Button> */}
              </Actions>
              {concertMode && <ConcertList nearbyConcerts={nearbyConcerts} />}
              <Footer />
            </>
          )}
        </>
      </ThemeProvider>
    );
  }
}

export default connect(
  ({ user, artists, createPlaylist: createPlaylistState, concerts }: IState) => ({
    user,
    artists,
    createPlaylistState,
    concerts,
  }),
  {
    getUserDetailsStart: spotifyActions.getUserDetailsStart,
    getTopArtistsStart: spotifyActions.getTopArtistsStart,
    getConcertsStart: songkickActions.getConcertsStart,
    createPlaylistStart: spotifyActions.createPlaylistStart,
    getAccessToken: spotifyActions.getAccessToken,
  },
)(App);
