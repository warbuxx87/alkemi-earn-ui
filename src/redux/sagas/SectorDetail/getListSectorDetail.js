import { call, put, takeLatest } from 'redux-saga/effects';
import {
    GET_LIST_SECTOR_DETAIL_REDUCER,
    GET_LIST_SECTOR_DETAIL_REQUEST,
} from '../../reducers/SectorDetail/actionTypes';
import { getListSectorDetailAPI } from '../../../services/SectorDetail/getListSectorDetail';
// import { LOADING } from '../../reducers/SectorDetail/actionTypes';

const getCookie = (cname) => {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
}
function* requestGetListSectorDetail() {
    try {
        const res = yield call(getListSectorDetailAPI);

        // let sectorIdTemp = 29;
        // let productIdTemp = 327;
        // let tier2IdTemp = 366;
        // let tier3IdTemp = 441;

        let sectorIdTemp = yield call(getCookie,'sector_id') || 0;
        let productIdTemp = yield call(getCookie,'product_id') || 0;
        let tier2IdTemp = yield call(getCookie,'tier2_id') || 0;
        let tier3IdTemp = yield call(getCookie,'tier3_id') || 0;


        let sectorId = 0;
        let sector = {};
        let product = {};
        let chosenTier2Temp = null;
        let tier3ListTemp = [];
        let chosenTier3Temp = null;

        if (res.data.sectors.length > 0) {
          if (sectorIdTemp && productIdTemp) {
            sectorId   = sectorIdTemp;
            sector     = typeof res.data.sector_data[sectorIdTemp] != 'undefined' ? res.data.sector_data[sectorIdTemp] : {};
            product    = typeof res.data.product_data[productIdTemp] != 'undefined' ? res.data.product_data[productIdTemp] : {};
          }
        }

        if (Object.keys(sector).length === 0 || Object.keys(product).length === 0) {
          sectorId  = res.data.sectors[0].id;
          sector    = res.data.sectors[0];
          product   = sector && sector.children.length > 0 ? sector.children[0] : {};
        }
        if (tier2IdTemp) {
          chosenTier2Temp = typeof res.data.sub_category_1_data[tier2IdTemp] != 'undefined' ? res.data.sub_category_1_data[tier2IdTemp] : null;
          tier3ListTemp   = typeof res.data.sub_category_1_data[tier2IdTemp] != 'undefined' && res.data.sub_category_1_data[tier2IdTemp].children ? res.data.sub_category_1_data[tier2IdTemp].children : [];
        }

        if (tier3IdTemp) {
          chosenTier3Temp = typeof res.data.sub_category_2_data[tier3IdTemp] != 'undefined' ? res.data.sub_category_2_data[tier3IdTemp] : null;
        }

        yield put({
          type           : GET_LIST_SECTOR_DETAIL_REDUCER,
          sectorDetail   : res.data,
          chosenSector   : sector,
          chosenProduct  : product,
          sectorProducts : res.data.sector_data[sectorId].children,
          tier2List      : product && product.id ? res.data.product_data[product.id].children : [],
          chosenTier2    : chosenTier2Temp,
          tier3List      : tier3ListTemp,
          chosenTier3    :chosenTier3Temp,
        });
        // yield put({
        //   type            : LOADING,
        //   loading       : false
        // });
      } catch (error) {
        return Promise.reject(error);
      }
}

function* listSectorDetail() {
  yield takeLatest(GET_LIST_SECTOR_DETAIL_REQUEST, requestGetListSectorDetail);
}

export default listSectorDetail;
