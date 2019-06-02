import React, { Component } from 'react';
import { Button } from '../../components';
import { Wrap } from './Login.styled';
import { authorizeSpotifyApi } from 'api/spotify.api';

type TProps = {};

class Login extends Component<TProps> {
  render() {
    return (
      <Wrap>
        <Button onClick={() => authorizeSpotifyApi()} buttonStyle="spotify">
          Login with Spotify
        </Button>
      </Wrap>
    );
  }
}

export default Login;
