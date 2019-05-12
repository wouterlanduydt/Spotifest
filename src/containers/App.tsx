import React, { Component } from 'react';
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import queryString from 'query-string';
import { BACKEND_URLS, timeRanges, DEFAULT_BG, SPOTIFY_API } from '../config/constants';
import getArtistImportance from '../lib/getArtistImportance';
import global from '../styles/global';
import { backgroundColors } from '../styles/branding';
import Button from '../components/Button';
import Poster from '../components/Poster';
import TimeRangeSelector from '../components/TimeRangeSelector';
import ColorSelector from '../components/ColorSelector';
import Footer from '../components/Footer';
import { TTopArtistsResponse } from 'types/api';
import { TArtist } from 'types/general';

const GlobalStyle = createGlobalStyle`
  ${reset}
  ${global}
`;

type TProps = {};

type TState = {
  accessToken: string;
  artists: TArtist[];
  profilePictureUrl: string;
  selectedTimeRangeIndex: number;
  backgroundColor: string;
};

class App extends Component<TProps, TState> {
  constructor(props: TProps) {
    super(props);
    this.state = {
      accessToken: '',
      artists: [],
      profilePictureUrl: '',
      selectedTimeRangeIndex: 2,
      backgroundColor: backgroundColors[0],
    };
  }

  headers = {};

  componentDidMount = () => {
    const parsedUrl = queryString.parse(window.location.search);
    const accessToken = parsedUrl.access_token as string;
    this.setState({ accessToken });
    if (!accessToken) return;

    this.headers = {
      Authorization: 'Bearer ' + accessToken,
    };

    fetch(SPOTIFY_API.ME, { headers: this.headers })
      .then(response => response.json())
      .then(user =>
        this.setState({
          profilePictureUrl: (user.images && user.images[0] && user.images[0].url) || DEFAULT_BG,
        }),
      );

    this.updateArtists();
  };

  updateArtists = () => {
    const { selectedTimeRangeIndex } = this.state;

    const query =
      '?' +
      queryString.stringify({
        limit: 50,
        time_range: timeRanges[selectedTimeRangeIndex].value,
      });

    fetch(SPOTIFY_API.TOP_ARTISTS + query, {
      headers: this.headers,
    })
      .then(response => response.json())
      .then(({ items: artists }: TTopArtistsResponse) =>
        this.setState({
          artists: artists.map((artist, i) => ({
            name: artist.name,
            link: artist.external_urls.spotify,
            importance: getArtistImportance(i),
          })),
        }),
      )
      .catch(e => console.log(e));
  };

  handleLogin = () =>
    ((window.location as any) = window.location.href.includes('localhost')
      ? BACKEND_URLS.LOCAL
      : BACKEND_URLS.PROD);

  handleTimeRangeChange = (selectedTimeRangeIndex: number) =>
    this.setState({ selectedTimeRangeIndex }, this.updateArtists);

  render() {
    const {
      accessToken,
      artists,
      profilePictureUrl,
      selectedTimeRangeIndex,
      backgroundColor,
    } = this.state;

    return (
      <>
        <GlobalStyle />
        <div>
          {!accessToken && (
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
          )}
          {artists.length !== 0 && (
            <div>
              <TimeRangeSelector
                timeRanges={timeRanges}
                handleTimeRangeChange={this.handleTimeRangeChange}
                selectedTimeRangeIndex={selectedTimeRangeIndex}
              />
              <ColorSelector
                backgroundColors={backgroundColors}
                selectedColor={backgroundColor}
                onButtonClick={(backgroundColor: string) => this.setState({ backgroundColor })}
              />
              <Poster
                backgroundColor={backgroundColor}
                profilePictureUrl={profilePictureUrl}
                artists={artists}
              />
              <Footer color={backgroundColor} />
            </div>
          )}
        </div>
      </>
    );
  }
}

export default App;
