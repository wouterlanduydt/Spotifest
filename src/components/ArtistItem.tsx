import React from "react";
import styled, { css } from "styled-components";

const getWrapperCss = (importance: number) => {
  switch (importance) {
    case 1:
      return css`
        :not(:last-child) {
          margin-right: 8px;
          @media (min-width: 460px) {
            margin-right: 16px;
          }
        }
      `;
    case 2:
      return css`
        margin: 2px 0;
        :not(:last-child) {
          margin-right: 6px;
          @media (min-width: 460px) {
            margin-right: 8px;
          }
        }
      `;
    case 3:
      return css`
        margin: 2px 0;
        :not(:last-child) {
          margin-right: 4px;
          @media (min-width: 460px) {
            margin-right: 6px;
          }
        }
      `;
    default:
      return css`
        margin: 2px 0;
        :not(:last-child) {
          margin-right: 4px;
          @media (min-width: 460px) {
            margin-right: 6px;
          }
        }
      `;
  }
};

const getArtistLinkCss = (importance: number) => {
  switch (importance) {
    case 1:
      return css`
        font-size: 7vw;
        font-weight: 900;
        @media (min-width: ${({ theme }) => theme.constants.posterWidth}) {
          font-size: 4.2em;
        }
      `;
    case 2:
      return css`
        font-size: 4.2vw;
        font-weight: 700;
        @media (min-width: ${({ theme }) => theme.constants.posterWidth}) {
          font-size: 2.4em;
        }
      `;
    case 3:
      return css`
        font-size: 3vw;
        font-weight: 500;
        @media (min-width: ${({ theme }) => theme.constants.posterWidth}) {
          font-size: 1.6em;
        }
      `;
    default:
      return css`
        font-size: 3vw;
        font-weight: 500;
        @media (min-width: ${({ theme }) => theme.constants.posterWidth}) {
          font-size: 1.6em;
        }
      `;
  }
};

const Wrapper = styled.li<{ importance: number }>`
  ${({ importance }) => getWrapperCss(importance)};
`;

const ArtistLink = styled.a<{ importance: number }>`
  color: white;
  text-shadow: rgba(0, 0, 0, 0.2) 0px 0 24px;
  text-decoration: none;
  ${({ importance }) => getArtistLinkCss(importance)};

  &:hover,
  &:focus {
    outline: none;
    text-decoration: underline;
  }
`;

type TProps = {
  name: string;
  link: string;
  importance: number;
};

const ArtistItem = ({ name, link, importance }: TProps) => (
  <Wrapper importance={importance}>
    <ArtistLink
      importance={importance}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
    >
      {name}
    </ArtistLink>
  </Wrapper>
);

export default ArtistItem;
