import { call, put, takeLatest } from 'redux-saga/effects';
import {
    GET_LIST_MARKET_FORECAST_REDUCER,
    GET_LIST_MARKET_FORECAST_REQUEST,
    SET_STATUS_LOADING_MARKET_FORECAST
} from '../../reducers/MarketForecast/ActionType';
import { getListMarketForecastAPI } from '../../../services/marketForecast/getListMarketForecast';
import moment from 'moment';


function* requestGetListMarketForecast(data) {
  try {
    yield put({
      type: SET_STATUS_LOADING_MARKET_FORECAST,
      showLoading : true
    });
    if(!localStorage.getItem('token')) return;
    const ListMarketForecast = yield call(getListMarketForecastAPI, data.data);
    let newData = []
    ListMarketForecast.data.map(item => {
      if(!newData.length){
        newData.push({
          dayFrom : moment(item.created_at, 'YYYY-MM-DD HH:mm:ss').weekday(1),
          dayTo : moment(item.created_at, 'YYYY-MM-DD HH:mm:ss').weekday(7),
          name : moment(item.created_at, 'YYYY-MM-DD HH:mm:ss').weekday(1).format("DD MMM YYYY")+' - '+ moment(item.created_at, 'YYYY-MM-DD HH:mm:ss').weekday(7).format("DD MMM YYYY"),
          data : [ item ]
        })
      }
      else {
        let lastweek = newData[newData.length-1];
        if((moment(item.created_at, 'YYYY-MM-DD').isBetween(lastweek.dayFrom , lastweek.dayTo, 'day',[]))){
          newData[newData.length-1].data.push(item);
        }
        else {
          newData.push({
            dayFrom : moment(item.created_at, 'YYYY-MM-DD HH:mm:ss').weekday(1),
            dayTo : moment(item.created_at, 'YYYY-MM-DD HH:mm:ss').weekday(7),
            name : moment(item.created_at, 'YYYY-MM-DD HH:mm:ss').weekday(1).format("DD MMM YYYY")+' - '+ moment(item.created_at, 'YYYY-MM-DD HH:mm:ss').weekday(7).format("DD MMM YYYY"),
            data : [ item ]
          })
        }
      }
    })
    yield put({
      type: GET_LIST_MARKET_FORECAST_REDUCER,
      listData: newData
    });
  } catch (error) {
    return Promise.reject(error);
  }
}

function* ListMarketForecast() {
  yield takeLatest(GET_LIST_MARKET_FORECAST_REQUEST, requestGetListMarketForecast);
}

export default ListMarketForecast;
