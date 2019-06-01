import React from 'react';
import { IState } from 'redux/reducers';
import LoadingIndicator from './LoadingIndicator';
import { getUnique } from 'lib';
import { parse as parseDate } from 'date-fns';
import { SONGKICK_DATE_FORMAT } from 'api/songkick.api';

type TProps = {
  nearbyConcerts: IState['concerts'];
};

const ConcertList = ({ nearbyConcerts }: TProps) => {
  const _allConcerts: any[] = [];
  const allArtists = nearbyConcerts.value ? Object.keys(nearbyConcerts.value) : [];

  if (nearbyConcerts.value) {
    Object.keys(nearbyConcerts.value).forEach(artist =>
      _allConcerts.push(nearbyConcerts.value![artist]),
    );
  }
  const allConcerts = getUnique([].concat.apply([], _allConcerts), 'id').sort(
    (a, b) =>
      parseDate(a.start.date, SONGKICK_DATE_FORMAT, new Date()).getTime() -
      parseDate(b.start.date, SONGKICK_DATE_FORMAT, new Date()).getTime(),
  );
  console.log(allConcerts);

  const getNames = (concert: any): string[] =>
    concert.performance
      .filter(({ displayName }: any) =>
        allArtists.map(artist => displayName.includes(artist)).includes(true),
      )
      .map((performance: any) => performance.displayName);

  return (
    <>
      <h2 style={{ color: 'white' }}>events in XXX kms</h2>
      {nearbyConcerts.isLoading && <LoadingIndicator />}
      {!!allConcerts && (
        <ol>
          {allConcerts.map((concert: any) => {
            const names = getNames(concert);

            return (
              <li key={concert.id} style={{ color: 'white' }}>
                {concert.displayName.toUpperCase()}
                <br />
                {names.length > 1 && (
                  <ul>
                    {names.map(name => (
                      <li key={name}>{name}</li>
                    ))}
                  </ul>
                )}
                <br />
              </li>
            );
          })}
        </ol>
      )}
    </>
  );
};

export default React.memo(ConcertList);
