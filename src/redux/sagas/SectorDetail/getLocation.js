import { call, put, takeLatest } from 'redux-saga/effects';
import {
    GET_LOCATION_REDUCER,
    GET_LOCATION_REQUEST,
} from '../../reducers/SectorDetail/actionTypes';
import { getLocationAPI } from '../../../services/SectorDetail/getLocation';


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
function* requestGetLocation(action) {
    try {
        const res = yield call(getLocationAPI,action.pms);
        // console.log(res,'getLocationAPI');
        // let countryIdTemp = 32;
        let countryIdTemp = yield call(getCookie,'country_id');
        let countryId = null;
        let country = {};
        let provinceList = [];
        if (countryIdTemp) {
            countryId = countryIdTemp;
            country = typeof res.data.country_data[countryIdTemp] != 'undefined' ? res.data.country_data[countryIdTemp] : {};

            provinceList = typeof res.data.country_data[countryIdTemp] != 'undefined' ? res.data.country_data[country.id].children : [];
        }

        if (Object.keys(country).length === 0) {
            if(res.data.countries[0])
            {
              countryId = res.data.countries[0].id;

               provinceList = typeof res.data.countries[0] != 'undefined' ? res.data.countries[0].children : [];
            }
            else{
              countryId = 0;
            }
            country = res.data.countries[0];

        }

        // cityList: res.data.locationList.region_data[province.id].children,

        yield put({
            type            : GET_LOCATION_REDUCER,
            locationList    : res.data,
            chosenCountry   : country,
            provinceList    : provinceList,
            // provinceList    : res.data.locationList.country_data[country.id].children,
            cityList: [],
        });
      } catch (error) {
        return Promise.reject(error);
      }
}

function* getLocation() {
  yield takeLatest(GET_LOCATION_REQUEST, requestGetLocation);
}

export default getLocation;
