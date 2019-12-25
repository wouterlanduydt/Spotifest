import React from 'react';
import { Button } from '../../components';
import { Wrap } from './Login.styled';
import { authorizeSpotifyApi } from 'api/spotify.api';

export const Login: React.FC = () => (
  <Wrap>
    <Button onClick={() => authorizeSpotifyApi()} buttonStyle="spotify">
      Login with Spotify
    </Button>
  </Wrap>
);
