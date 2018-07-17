import React from "react";
import PropTypes from "prop-types";
import styled, { css } from "styled-components";

const getWrapperCss = importance => {
  switch (importance) {
    case 1:
      return css`
        :not(:last-child) {
          margin-right: 16px;
        }
      `;
    case 2:
      return css`
        margin: 2px 0;
        :not(:last-child) {
          margin-right: 8px;
        }
      `;
    case 3:
      return css`
        margin: 2px 0;
        :not(:last-child) {
          margin-right: 6px;
        }
      `;
    default:
      return css`
        margin: 2px 0;
        :not(:last-child) {
          margin-right: 4px;
        }
      `;
  }
};

const getArtistLinkCss = importance => {
  switch (importance) {
    case 1:
      return css`
        font-size: 7.6vw;
        font-weight: 900;
        @media (min-width: ${props => props.theme.constants.posterWidth}) {
          font-size: 4.2em;
        }
      `;
    case 2:
      return css`
        font-size: 4.6vw;
        font-weight: 700;
        @media (min-width: ${props => props.theme.constants.posterWidth}) {
          font-size: 2.4em;
        }
      `;
    case 3:
      return css`
        font-size: 3.2vw;
        font-weight: 500;
        @media (min-width: ${props => props.theme.constants.posterWidth}) {
          font-size: 1.6em;
        }
      `;
    default:
      return css`
        font-size: 3.2vw;
        font-weight: 500;
        @media (min-width: ${props => props.theme.constants.posterWidth}) {
          font-size: 1.6em;
        }
      `;
  }
};

const Wrapper = styled.li`
  ${props => getWrapperCss(props.importance)};
`;

const ArtistLink = styled.a`
  color: white;
  text-shadow: rgba(0, 0, 0, 0.2) 0px 0 24px;
  text-decoration: none;

  ${props => getArtistLinkCss(props.importance)};
  &:hover {
    text-decoration: underline;
  }
`;

const ArtistItem = ({ name, link, importance }) => (
  <Wrapper importance={importance}>
    <ArtistLink importance={importance} href={link} target="_blank">
      {name}
    </ArtistLink>
  </Wrapper>
);

ArtistItem.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  importance: PropTypes.number.isRequired
};

export default ArtistItem;
