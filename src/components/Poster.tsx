import React from 'react';
import Title from './Title';
import SpotifyLogo from '../assets/svg/spotify.svg';
import ArtistItem from './ArtistItem';
import { getSeparatorIndexes, keys } from 'lib';
import styled from 'styled-components';
import { IState } from 'redux/reducers';
import { fadeIn } from 'styles/animations';
import Overlay from './Overlay';
import { convertToDueTone } from 'styles/utils';
import idx from 'idx';

type TProps = {
  username: string | undefined | null;
  artists: IState['artists'];
  posterMeta: IState['posterMeta'];
};

const Wrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 96vw;
  height: 135vw;
  max-width: ${({ theme }) => theme.maxPoster}px;
  max-height: 900px;
  margin: 0 auto;
  padding: 8px;
  margin-top: 16px;
  user-select: none;
  overflow-y: hidden;
`;

const AnimationWrap = styled.div`
  animation-name: ${fadeIn};
  animation-duration: 400ms;
  animation-timing-function: ease-in-out;
`;

const ArtistsWrap = styled.ol`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const Separator = styled.div`
  width: 100%;
  margin: 1.6vw 0 1.2vw;
  text-align: center;
  position: relative;

  span {
    color: white;
    text-transform: uppercase;
    font-size: 2vw;

    display: flex;
    width: 80%;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    text-align: center;

    &:before,
    &:after {
      content: '';
      border-top: 1px solid;
      margin: 0 8px 0 0;
      flex: 1 0 8px;
    }

    &:after {
      margin: 0 0 0 8px;
    }
  }

  @media (min-width: ${({ theme }) => theme.maxPoster}px) {
    margin: 12px 0 8px;

    span {
      font-size: 12px;
    }
  }
`;

const Background = styled.canvas`
  position: absolute;
  z-index: -1;
  width: 96vw;
  height: 135vw;
  max-width: ${({ theme }) => theme.maxPoster}px;
  max-height: 900px;
`;

const LogoWrap = styled.div`
  position: absolute;
  bottom: 8px;
  width: 6vw;
  height: auto;
  max-width: 24px;

  img {
    width: 100%;
    height: 100%;
  }
`;

class Poster extends React.PureComponent<TProps> {
  canvasRef: React.RefObject<HTMLCanvasElement>;

  constructor(props: TProps) {
    super(props);
    this.canvasRef = React.createRef<HTMLCanvasElement>();
  }

  componentDidUpdate = ({ artists: prevArtists }: TProps) => {
    const {
      artists,
      posterMeta: { value: posterMeta },
    } = this.props;
    const canvas = this.canvasRef.current;
    const ctx = canvas ? canvas.getContext('2d') : undefined;

    if (artists.value.length !== prevArtists.value.length && (ctx && canvas) && posterMeta) {
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      artists.value.forEach((artist, i) => {
        if (idx(artist, _ => _.images[0].url)) {
          const imageReceived = (e: Event) => {
            const img = e.target as HTMLImageElement;

            const rescaleFactor = 6;

            const width = img.width / rescaleFactor;
            const height = img.height / rescaleFactor;
            const xPos = Math.floor(Math.random() * canvas.width) - width / 2;
            const yPos = Math.floor(Math.random() * canvas.height) - height / 2;

            ctx.drawImage(img, xPos, yPos, width, height);

            if (i === artists.value.length - 1) {
              setTimeout(() => {
                // https://codepen.io/72lions/pen/jPzLJX
                var canvasData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                var pixelCount = canvas.width * canvas.height;

                var dueToneData = convertToDueTone(
                  canvasData,
                  pixelCount,
                  keys[posterMeta.key].colors[0],
                  keys[posterMeta.key].colors[1],
                );

                var imageData = new ImageData(
                  new Uint8ClampedArray(dueToneData),
                  canvas.width,
                  canvas.height,
                );

                ctx.putImageData(imageData, 0, 0, 0, 0, canvas.width, canvas.height);

                // apply styles after last image here
              }, 400);
            }
          };
          let downloadedImg;
          downloadedImg = new Image();
          downloadedImg.crossOrigin = 'Anonymous';
          downloadedImg.addEventListener('load', imageReceived, false);
          downloadedImg.src = artist.images[0].url;
        }
      });
    }
  };

  render() {
    const { artists, username } = this.props;
    const [long, medium] = getSeparatorIndexes(artists.value);

    return artists.isLoading ? (
      <Overlay text="Generating Poster..." />
    ) : (
      <AnimationWrap className="ignore-save-img">
        <Wrap id="poster">
          <Background width={640} height={900} ref={this.canvasRef} />
          <Title title="Spotifest" username={username} />
          <ArtistsWrap>
            {artists.value &&
              artists.value.map((artist, i) => (
                <React.Fragment key={artist.id}>
                  {(i === 0 || i === long || i === medium) && (
                    <Separator>
                      <span>
                        {i === 0 ? 'long term' : i === long ? 'medium term' : 'short term'}
                      </span>
                    </Separator>
                  )}
                  <ArtistItem artist={artist} position={i} key={`${artist.id}-${i}`} />
                </React.Fragment>
              ))}
          </ArtistsWrap>

          <LogoWrap>
            <a href="https://www.spotify.com" rel="noopener noreferrer">
              <img src={SpotifyLogo} alt="" />
            </a>
          </LogoWrap>
        </Wrap>
      </AnimationWrap>
    );
  }
}

export default Poster;
