import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ConcertList } from 'components';
import { filterConcertsByDistance, getUserLocation } from 'lib';
import { spotifyActions, songkickActions } from 'redux/actions';
import { IState } from 'redux/reducers';
import { ETimeRange, distances } from 'types/general';

type TProps = {
  getConcertsStart: (timeRange: ETimeRange) => void;
  artists: IState['artists'];
  concerts: IState['concerts'];
};

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
    if (!this.state.userCoords)
      getUserLocation()
        .then(({ coords: userCoords }) => this.setState({ userCoords }))
        .catch(e => console.log(e));

    // TODO: get timerange from url
    this.props.getConcertsStart(ETimeRange.medium);
  };

  render() {
    const { userCoords, range } = this.state;
    const { concerts } = this.props;
    const nearbyConcerts = filterConcertsByDistance(concerts, userCoords, range);

    return (
      <>
        <div>
          {Object.values(distances).map(distance => (
            <button onClick={() => this.setState({ range: distance.value })} disabled={!userCoords}>
              {distance.label}
            </button>
          ))}
          <button onClick={() => this.setState({ range: 9999999999999999 })}>everywhere</button>
        </div>
        <ConcertList nearbyConcerts={nearbyConcerts} />
      </>
    );
  }
}

export default connect(
  ({ concerts }: IState) => ({ concerts }),
  {
    getConcertsStart: songkickActions.getConcertsStart,
  },
)(Concerts);
