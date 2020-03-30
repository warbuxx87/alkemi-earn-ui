import { all } from 'redux-saga/effects';
import { userSagas } from './User';
import { dataSagas } from './Data';
import { countriesSagas } from './Countries';
import { categorySagas } from './Category';
import { marketCommSagas } from './MarketComm';
import { sectorDetailSage } from './SectorDetail';
import { marketForecastSagas } from './MarketForecast';
import { cardSagas } from './Card';
import { subscriptionSagas } from './SubscriptionPlan';
import {dataHomeSagas} from './DataHome'
// Register all your watchers
export const rootSaga = function* root() {
  yield all([
    userSagas(),
    dataSagas(),
    countriesSagas(),
    categorySagas(),
    marketCommSagas(),
    sectorDetailSage(),
    marketForecastSagas(),
    cardSagas(),
    subscriptionSagas(),
    dataHomeSagas()
  ]);
};
