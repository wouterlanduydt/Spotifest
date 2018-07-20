import React, { Component } from "react";
import { injectGlobal, ThemeProvider } from "styled-components";
import reset from "styled-reset";
import queryString from "query-string";
import {
  BACKEND_URLS,
  timeRanges,
  defaultBackgroundUrl,
  SPOTIFY_ENDPOINTS,
  backgroundColors
} from "../config/variables";
import getMostCommonGenre from "../lib/getMostCommonGenre";
import getArtistImportance from "../lib/getArtistImportance";
import getGenreGroup from "../lib/getGenreGroup";
import global from "../styles/global";
import branding from "../styles/branding";
import Button from "../components/Button";
import Poster from "../components/Poster";
import TimeRangeSelector from "../components/TimeRangeSelector";
import ColorSelector from "../components/ColorSelector";
import Footer from "../components/Footer";

injectGlobal`
${reset} 
${global}`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: "",
      artists: [],
      mostCommonGenre: "",
      genreGroup: null,
      profilePictureUrl: "",
      selectedTimeRangeIndex: 2,
      backgroundColor: backgroundColors[0].name
    };
  }

  componentDidMount = () => {
    const parsedUrl = queryString.parse(window.location.search);
    const accessToken = parsedUrl.access_token;
    this.setState({ accessToken: accessToken });
    if (!accessToken) return;

    this.headers = {
      Authorization: "Bearer " + accessToken
    };

    fetch(SPOTIFY_ENDPOINTS.me, {
      headers: this.headers
    })
      .then(response => response.json())
      .then(user => {
        this.setState({
          profilePictureUrl:
            (user.images && user.images[0] && user.images[0].url) ||
            defaultBackgroundUrl // default background
        });
      });

    this.updateArtists();
  };

  updateArtists = () => {
    const { selectedTimeRangeIndex, mostCommonGenre } = this.state;

    const query =
      "?" +
      queryString.stringify({
        limit: 50,
        time_range: timeRanges[selectedTimeRangeIndex].value
      });

    fetch(SPOTIFY_ENDPOINTS.topArtists + query, {
      headers: this.headers
    })
      .then(response => response.json())
      .then(artists => {
        const genreArrays = artists.items.map(a => a.genres);
        this.setState({ mostCommonGenre: getMostCommonGenre(genreArrays) });
        this.setState({
          genreGroup: getGenreGroup(mostCommonGenre)
        });
        this.setState({
          artists: artists.items.map((artist, i) => ({
            name: artist.name,
            link: artist.external_urls.spotify,
            importance: getArtistImportance(i)
          }))
        });
      })
      .catch(e => console.log(e));
  };

  handleLoginClick = () => {
    window.location = window.location.href.includes("localhost")
      ? BACKEND_URLS.LOCAL
      : BACKEND_URLS.PROD;
  };

  handleTimeRangeChange = i => {
    this.setState({ selectedTimeRangeIndex: i }, this.updateArtists);
  };

  render() {
    const {
      accessToken,
      artists,
      profilePictureUrl,
      selectedTimeRangeIndex,
      backgroundColor
    } = this.state;

    return (
      <ThemeProvider theme={branding}>
        <div>
          {!accessToken && (
            <div
              style={{
                width: "100vw",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Button
                onButtonClick={() => this.handleLoginClick()}
                text="Login with Spotify"
              />
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
                onButtonClick={color =>
                  this.setState({ backgroundColor: color })
                }
              />
              <Poster
                backgroundColor={backgroundColor}
                profilePictureUrl={profilePictureUrl}
                artists={artists}
              />
              <Footer
                name="Wouter Landuydt"
                websiteLink="https://wouterlanduydt.be/"
                sourceLink="https://github.com/wouterlanduydt/Spotifest"
              />
            </div>
          )}
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
