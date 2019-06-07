import React, { Component } from 'react';
import { Button, Poster, Select, Footer, Overlay } from '../../components';
import { connect } from 'react-redux';
import { spotifyActions } from 'redux/actions';
import { IState } from 'redux/reducers';
import idx from 'idx';
import { Filters, Actions } from './Home.styled';
import { RouteComponentProps } from 'react-router';

type TProps = {
  getUserDetailsStart: () => void;
  createPlaylistStart: () => void;
  getTopArtistsStart: () => void;
  user: IState['user'];
  artists: IState['artists'];
  createPlaylistState: IState['createPlaylist'];
} & RouteComponentProps;

class Home extends Component<TProps> {
  componentDidMount = () => {
    this.props.getTopArtistsStart();
  };

  render() {
    const { user, artists, createPlaylistStart, createPlaylistState } = this.props;

    return (
      <>
        <Poster username={idx(user, _ => _.value.display_name)} artists={artists} />
        {createPlaylistState.isLoading && <Overlay text="Creating Playlist..." />}

        <Actions>
          <Button
            onClick={() => createPlaylistStart()}
            disabled={!artists.value}
            title="Create a playlist containing recommendations based on your top artists."
          >
            Generate Playlist
          </Button>
          <Button onClick={() => window.alert('Coming soon')}>Save as image</Button>
          <Button to={`/concerts`}>See Concerts</Button>
        </Actions>
        <Footer />
      </>
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
    getTopArtistsStart: spotifyActions.getTopArtistsStart,
    createPlaylistStart: spotifyActions.createPlaylistStart,
  },
)(Home);
