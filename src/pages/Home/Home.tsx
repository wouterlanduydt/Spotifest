import React from 'react';
import { Button, Poster, Footer } from '../../components';
import { connect } from 'react-redux';
import { spotifyActions } from 'redux/actions';
import { IState } from 'redux/reducers';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { Actions } from './Home.styled';
import { RouteComponentProps } from 'react-router';

type TProps = {
  getTopArtistsStart: () => void;
  user: IState['user'];
  artists: IState['artists'];
} & RouteComponentProps;

const HomeFC: React.FC<TProps> = props => {
  const { getTopArtistsStart, user, artists } = props;
  const hasNoArtists = artists.value.length === 0;

  React.useEffect(() => {
    getTopArtistsStart();
  }, [getTopArtistsStart]);

  const handleSaveImage = () => {
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

  return (
    <>
      <Poster username={user.value?.display_name} artists={artists} />

      <Actions>
        <Button onClick={handleSaveImage} disabled={hasNoArtists}>
          Save as image
        </Button>
      </Actions>
      <Footer />
    </>
  );
};

export const Home = connect(({ user, artists }: IState) => ({ user, artists }), {
  getTopArtistsStart: spotifyActions.getTopArtistsStart,
})(HomeFC);
