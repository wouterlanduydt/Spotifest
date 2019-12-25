import React from 'react';
import { Button, Poster, Footer } from '../../components';
import { spotifyActions } from 'redux/actions';
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import { Actions } from './Home.styled';
import { useDispatch, useSelector } from 'react-redux';
import { IState } from 'redux/reducers';

export const Home: React.FC = () => {
  const user = useSelector((state: IState) => state.user);
  const artists = useSelector((state: IState) => state.artists);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(spotifyActions.getTopArtistsStart());
  }, [dispatch]);

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

  const hasNoArtists = artists.value.length === 0;

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
