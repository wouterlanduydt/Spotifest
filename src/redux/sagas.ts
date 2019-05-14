import { call, put, takeLatest } from 'redux-saga/effects';
import {
  getUserDetailsStart,
  getUserDetailsSuccess,
  getUserDetailsFail,
  getTopArtistsStart,
  getTopArtistsFail,
  getTopArtistsSuccess,
} from './actions';
import { fetchUserDetails, fetchTopArtists } from 'api/spotify.api';
import { ETimeRange } from 'types/general';

type TAction<T = void> = {
  type: string;
  payload: T;
};

function* getUserDetailsFlow() {
  try {
    const userDetails = yield call(fetchUserDetails);
    yield put(getUserDetailsSuccess(userDetails));
  } catch (e) {
    yield put(getUserDetailsFail(e));
  }
}

function* getTOpArtistsFlow({ payload: timeRange }: TAction<ETimeRange>) {
  try {
    const { items: value } = yield call(fetchTopArtists, timeRange);
    yield put(getTopArtistsSuccess({ timeRange, value }));
  } catch (error) {
    yield put(getTopArtistsFail({ timeRange, error }));
  }
}

function* saga() {
  yield takeLatest(getUserDetailsStart, getUserDetailsFlow);
  yield takeLatest(getTopArtistsStart, getTOpArtistsFlow);
}

export default saga;
