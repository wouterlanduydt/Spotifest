import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LoadingIndicator, EventItem, Select } from 'components';
import { filterConcertsByDistance, getUserLocation, getUnique } from 'lib';
import { songkickActions } from 'redux/actions';
import { parse as parseDate } from 'date-fns';
import { IState } from 'redux/reducers';
import { distances } from 'types/general';
import { SONGKICK_DATE_FORMAT } from 'api/songkick.api';
import { RouteComponentProps } from 'react-router';
import { Event } from 'types/songkick';
import { Wrap, Filters, Title, ContentWrap } from './Concerts.styled';

type TProps = {
  getConcertsStart: () => void;
  concerts: IState['concerts'];
} & RouteComponentProps;

type TState = {
  userCoords: Position['coords'] | undefined;
  range: number;
};

class Concerts extends Component<TProps, TState> {
  constructor(props: TProps) {
    super(props);
    this.state = {
      userCoords: undefined,
      range: 100,
    };
  }

  componentDidMount = () => {
    const { getConcertsStart } = this.props;

    if (!this.state.userCoords)
      getUserLocation()
        .then(({ coords: userCoords }) => this.setState({ userCoords }))
        .catch(e => console.log(e));

    getConcertsStart();
  };

  render() {
    const { userCoords, range } = this.state;
    const { concerts } = this.props;
    const nearbyConcerts = filterConcertsByDistance(concerts, userCoords, range);

    const _allConcerts: Event[][] = [];
    const allArtists = nearbyConcerts.value ? Object.keys(nearbyConcerts.value) : [];

    if (nearbyConcerts.value) {
      Object.keys(nearbyConcerts.value).forEach(artist =>
        _allConcerts.push(nearbyConcerts.value![artist]),
      );
    }
    const allConcerts: Event[] = getUnique([].concat.apply([], _allConcerts as any), 'id').sort(
      (a, b) =>
        parseDate(a.start.date, SONGKICK_DATE_FORMAT, new Date()).getTime() -
        parseDate(b.start.date, SONGKICK_DATE_FORMAT, new Date()).getTime(),
    );

    const getNames = (concert: Event): string[] =>
      concert.performance
        .filter(({ displayName }) =>
          allArtists.map(artist => displayName.includes(artist)).includes(true),
        )
        .map(performance => performance.displayName);

    return (
      <Wrap>
        <Filters>
          <Select
            label="Distance"
            items={[
              ...distances,
              {
                value: 9999999999,
                label: 'everywhere',
              },
            ]}
            onChange={range => this.setState({ range: parseInt(range, 10) })}
            initialIndex={1}
          />
        </Filters>
        <ContentWrap>
          {nearbyConcerts.value && <Title>{allConcerts.length} events found</Title>}

          {nearbyConcerts.isLoading && <LoadingIndicator />}
          {!!allConcerts && (
            <ol>
              {allConcerts.map((concert, i) => (
                <EventItem
                  key={`${concert.id}-${i}-${range}`}
                  event={concert}
                  names={getNames(concert)}
                  position={i}
                />
              ))}
            </ol>
          )}
        </ContentWrap>
      </Wrap>
    );
  }
}

export default connect(
  ({ concerts }: IState) => ({ concerts }),
  {
    getConcertsStart: songkickActions.getConcertsStart,
  },
)(Concerts);
