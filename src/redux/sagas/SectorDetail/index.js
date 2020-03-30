import { all } from 'redux-saga/effects';
import listSectorDetail from './getListSectorDetail';
import getStats from './getStats';
import getLocation from './getLocation';
import getAVGPrice from './getDataAVGPrice';
import getPriceHistory from './getDataPriceHistory';
import getDataChart from './getChartData';
import getDataCommentReport from './getCommentReport';
import getDataFileReport from './getFileReport';
export const sectorDetailSage = function* root() {
  yield all([
    listSectorDetail(),
    getStats(),
    getLocation(),
    getAVGPrice(),
    getPriceHistory(),
    getDataChart(),
    getDataCommentReport(),
    getDataFileReport(),
  ]);
};
