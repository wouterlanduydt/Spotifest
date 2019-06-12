import React, { Component } from 'react';
import { Button, Poster, Footer, Overlay } from '../../components';
import { connect } from 'react-redux';
import { spotifyActions } from 'redux/actions';
import { IState } from 'redux/reducers';
import idx from 'idx';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { Actions } from './Home.styled';
import { RouteComponentProps } from 'react-router';

type TProps = {
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

  handleSaveImage = () => {
    let poster = document.getElementById('poster');

    if (poster) {
      html2canvas(poster, {
        ignoreElements: item => item.className === 'ignore-save-img',
      })
        .then(canvas => canvas.toBlob(blob => blob && saveAs(blob, 'spotifest.png')))
        .catch(error => console.error(error));
    }

    if (!poster) console.error('no html element with id "poster" found');
  };

  render() {
    const { user, artists, createPlaylistState } = this.props;
    const hasNoArtists = artists.value.length === 0;

    return (
      <>
        <Poster username={idx(user, _ => _.value.display_name)} artists={artists} />
        {createPlaylistState.isLoading && <Overlay text="Creating Playlist..." />}

        <Actions>
          {/* <Button
            onClick={() => createPlaylistStart()}
            disabled={hasNoArtists}
            title="Create a playlist containing recommendations based on your top artists."
          >
            Generate Playlist
          </Button> */}

          <Button onClick={this.handleSaveImage} disabled={hasNoArtists}>
            Save as image
          </Button>

          <Button to={`/concerts`} disabled={hasNoArtists}>
            See Concerts
          </Button>
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
