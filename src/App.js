import React, { Component } from "react";
import queryString from "query-string";

class App extends Component {
  componentDidMount = () => {
    const parsedUrl = queryString.parse(window.location.search);
    const accessToken = parsedUrl.access_token;

    fetch("https://api.spotify.com/v1/me/top/artists", {
      headers: {
        Authorization: "Bearer " + accessToken
      }
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(e => console.log(e));
  };

  render() {
    return (
      <div>
        <h1>Spotify Top</h1>
        <button
          onClick={() => (window.location = "http://localhost:8888/login")}
        >
          Login
        </button>
      </div>
    );
  }
}

export default App;
