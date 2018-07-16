import React, { Component } from "react";
import { injectGlobal } from "styled-components";
import reset from "styled-reset";
import queryString from "query-string";
import getArtistImportance from "../lib/getArtistImportance";
import global from "../styles/global";
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
      artists: []
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
      .then(artists =>
        this.setState({
          artists: artists.items.map((artist, i) => ({
            name: artist.name,
            link: artist.external_urls.spotify,
            importance: getArtistImportance(i)
          }))
        })
      )
      .catch(e => console.log(e));
  };

  handleLoginClick = () => {
    window.location = window.location.href.includes("localhost")
      ? "http://localhost:8888/login"
      : "https://spotify-top-artists-backend.herokuapp.com/login";
  };

  render() {
    const { accessToken, artists } = this.state;

    return (
      <div>
        {!accessToken && (
          <Button onButtonClick={() => this.handleLoginClick()} text="Login" />
        )}
        {artists.length !== 0 && <ArtistList artists={artists} />}
      </div>
    );
  }
}

export default App;
