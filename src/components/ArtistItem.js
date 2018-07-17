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
        font-size: 4em;
        font-weight: 900;
      `;
    case 2:
      return css`
        font-size: 1.8em;
        font-weight: 700;
      `;
    case 3:
      return css`
        font-size: 1.4em;
        font-weight: 500;
      `;
    default:
      return css`
        font-size: 1.8em;
      `;
  }
};

const Wrapper = styled.li`
  ${props => getWrapperCss(props.importance)};
`;

const ArtistLink = styled.a`
  color: ${props => props.theme.genreColors[props.genreGroup].text};
  text-decoration: none;
  ${props => getArtistLinkCss(props.importance)};
`;

const ArtistItem = ({ name, link, importance, genreGroup }) => (
  <Wrapper importance={importance}>
    <ArtistLink
      genreGroup={genreGroup}
      importance={importance}
      href={link}
      target="_blank"
    >
      {name}
    </ArtistLink>
  </Wrapper>
);

ArtistItem.propTypes = {
  name: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  importance: PropTypes.number.isRequired,
  genreGroup: PropTypes.number.isRequired
};

export default ArtistItem;
