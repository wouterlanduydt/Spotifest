import React, { Component } from "react";
import { injectGlobal, ThemeProvider } from "styled-components";
import reset from "styled-reset";
import queryString from "query-string";
import { BACKEND_URLS } from "../config/variables";
import getMostCommonGenre from "../lib/getMostCommonGenre";
import getArtistImportance from "../lib/getArtistImportance";
import getGenreGroup from "../lib/getGenreGroup";
import global from "../styles/global";
import branding from "../styles/branding";
import Button from "../components/Button";
import ArtistList from "../components/ArtistList";

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
      profilePictureUrl: ""
    };
  }

  componentDidMount = () => {
    const parsedUrl = queryString.parse(window.location.search);
    const accessToken = parsedUrl.access_token;
    this.setState({ accessToken: accessToken });

    if (!accessToken) return;

    fetch(
      "https://api.spotify.com/v1/me/top/artists?time_range=long_term&limit=50",
      {
        headers: {
          Authorization: "Bearer " + accessToken
        }
      }
    )
      .then(response => response.json())
      .then(artists => {
        const genreArrays = artists.items.map(a => a.genres);
        this.setState({ mostCommonGenre: getMostCommonGenre(genreArrays) });
        this.setState({
          genreGroup: getGenreGroup(this.state.mostCommonGenre)
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

    fetch("https://api.spotify.com/v1/me", {
      headers: {
        Authorization: "Bearer " + accessToken
      }
    })
      .then(response => response.json())
      .then(user => this.setState({ profilePictureUrl: user.images[0].url }));
  };

  handleLoginClick = () => {
    window.location = window.location.href.includes("localhost")
      ? BACKEND_URLS.LOCAL
      : BACKEND_URLS.PROD;
  };

  render() {
    const { accessToken, artists, profilePictureUrl } = this.state;

    return (
      <ThemeProvider theme={branding}>
        <div>
          {!accessToken && (
            <Button
              onButtonClick={() => this.handleLoginClick()}
              text="Login"
            />
          )}
          {artists.length !== 0 && (
            <ArtistList
              profilePictureUrl={profilePictureUrl}
              artists={artists}
            />
          )}
        </div>
      </ThemeProvider>
    );
  }
}

export default App;
