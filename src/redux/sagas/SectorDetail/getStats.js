import { call, put, takeLatest } from 'redux-saga/effects';
import {
    GET_STATS_REDUCER,
    GET_STATS_REQUEST,
} from '../../reducers/SectorDetail/actionTypes';
import { getStatsAPI } from '../../../services/SectorDetail/getStats';

const getCookie = (cname) => {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
}
function* requestGetStats(action) {
    try {
        const res = yield call(getStatsAPI,action.pms);

        // let cookieStat = 814;
        let cookieStat = yield call(getCookie,'stat_id');
        let chosenStat = res.data.length > 0 ? res.data[0] : {};

        if (cookieStat && res.data.length > 0) {
            for (let i = 0; i < res.data.length; i++) {
              let stat = res.data[i];
              if (stat.id == cookieStat) {
                chosenStat = stat;
                break;
              }
            }
        }

        yield put({
            type        : GET_STATS_REDUCER,
            statList    : res.data,
            chosenStats  : chosenStat,
        });

      } catch (error) {
        return Promise.reject(error);
      }
}

function* getStats() {
  yield takeLatest(GET_STATS_REQUEST, requestGetStats);
}

export default getStats;
