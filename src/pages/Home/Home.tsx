import React, { Component } from 'react';
import { Button, Poster, Footer } from '../../components';
import { connect } from 'react-redux';
import { spotifyActions } from 'redux/actions';
import { IState } from 'redux/reducers';
import idx from 'idx';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { Actions } from './Home.styled';
import { RouteComponentProps } from 'react-router';

type TProps = {
  getTopArtistsStart: () => void;
  user: IState['user'];
  artists: IState['artists'];
} & RouteComponentProps;

class HomeFC extends Component<TProps> {
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
    const { user, artists } = this.props;
    const hasNoArtists = artists.value.length === 0;

    return (
      <>
        <Poster username={idx(user, _ => _.value.display_name)} artists={artists} />

        <Actions>
          <Button onClick={this.handleSaveImage} disabled={hasNoArtists}>
            Save as image
          </Button>
        </Actions>
        <Footer />
      </>
    );
  }
}

export const Home = connect(({ user, artists }: IState) => ({ user, artists }), {
  getTopArtistsStart: spotifyActions.getTopArtistsStart,
})(HomeFC);
