import React from 'react';
import styled from 'styled-components';
import { Event } from 'types/songkick';
import { format as formatDate, parse as parseDate } from 'date-fns';
import { SONGKICK_DATE_FORMAT } from 'api/songkick.api';
import { fadeIn } from 'styles/animations';

type TProps = {
  event: Event;
  position: number;
  names: string[];
};

const ListItem = styled.li<{ position: number }>`
  width: 100%;
  opacity: 0;

  animation-fill-mode: forwards;
  animation-name: ${fadeIn};
  animation-duration: 200ms;
  animation-timing-function: ease-in-out;
  animation-delay: ${({ position }) => position * 5}ms;

  :not(:last-child) {
    margin-bottom: 8px;
  }
`;

const Wrap = styled.a`
  width: 100%;
  display: flex;
  border: 1px solid white;
  border-radius: 2px;
  text-decoration: none;
`;

const DateWrap = styled.div`
  background-color: white;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 56px;

  .day {
    margin-bottom: 2px;
    font-weight: 500;
    font-size: 20px;
  }

  .month {
    text-transform: uppercase;
    font-weight: 600;
  }
`;

const ContentWrap = styled.div`
  color: white;
  padding: 8px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .title {
    font-weight: 500;
    font-size: 16px;
    margin-bottom: 2px;
  }

  .names-list {
    display: flex;
    flex-wrap: wrap;

    font-size: 14px;
    color: silver;
  }
`;

const EventItem = ({ event: { displayName, start, uri }, names, position }: TProps) => {
  const formatSongkickDate = (date: string, format: string) =>
    formatDate(parseDate(date, SONGKICK_DATE_FORMAT, new Date()), format);

  return (
    <ListItem position={position}>
      <Wrap target="_blank" href={uri}>
        <DateWrap>
          <span className="day">{formatSongkickDate(start.date, 'd')}</span>
          <span className="month">{formatSongkickDate(start.date, 'MMM')}</span>
        </DateWrap>
        <ContentWrap>
          <h3 className="title">{displayName}</h3>

          <p className="names-list">
            {names.map((name, i) => `${name}${i < names.length - 1 ? `, ` : ''}`)}
          </p>
        </ContentWrap>
      </Wrap>
    </ListItem>
  );
};

export default React.memo(EventItem);
