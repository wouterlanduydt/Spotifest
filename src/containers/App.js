import React, { Component } from "react";
import queryString from "query-string";
import Button from "../components/Button";

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

    fetch("https://api.spotify.com/v1/me/top/artists", {
      headers: {
        Authorization: "Bearer " + accessToken
      }
    })
      .then(response => response.json())
      .then(artists =>
        this.setState({
          artists: artists.items.map(artist => artist.name)
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
        <ul>{artists.map(artist => <li key={artist}>{artist}</li>)}</ul>
      </div>
    );
  }
}

export default App;
