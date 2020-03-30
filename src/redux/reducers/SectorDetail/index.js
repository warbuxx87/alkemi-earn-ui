import * as types from './actionTypes';

const initialState = {
    sectorDetail:{
      sectors: [],
      sector_data: {},
      product_data: {},
      sub_category_1_data: {},
      sub_category_2_data: {},
      sector_data_for_mobile:[],
      product_data_for_mobile: [],
      sub_category_1_data_for_mobile: [],
      sub_category_2_data_for_mobile:[],
    },
    chosenSector    :null,
    chosenProduct   :null,
    sectorProducts  :[],
    tier2List       :[],
    chosenTier2     :null,
    tier3List       :[],
    chosenTier3     :null,
    //*stats

    statList    : [],
    chosenStat  : null,
    isStats     : true,
    //*country
    
    locationList    : [],
    chosenCountry   : null,
    provinceList    : [],
    chosenProvince  : null,
    cityList        : [],
    chosenCity      : null,
    isLocation    : true,

    //AVG Price

    avgPrice : null,

    //historyPrice

    historyPrice : null,

    // fileReport

    fileReport  : null,

    // commentReport

    commentReport : null,
    // loading
    isLoading:false
    
  };
  // Redux: Counter Reducer
  const Product = (state = initialState, action) => {
    switch (action.type) {
      case  types.GET_LIST_SECTOR_DETAIL_REDUCER : {
        return {
          ...state,
          sectorDetail    : action.sectorDetail,
          chosenSector    : action.chosenSector,
          chosenProduct   : action.chosenProduct,
          sectorProducts  : action.sectorProducts,
          tier2List       : action.tier2List,
          chosenTier2     : action.chosenTier2,
          tier3List       : action.tier3List,
          chosenTier3     : action.chosenTier3,
          isStats         : true,
        };
      }
      case  types.GET_STATS_REDUCER : {
        return {
          ...state,
          statList    : action.statList,
          chosenStat  : action.chosenStats,
          isStats     : false,
          isLocation  : true,
        };
      }
      case  types.GET_LOCATION_REDUCER : {
        return {
          ...state,
          locationList    : action.locationList,
          chosenCountry   : action.chosenCountry,
          provinceList    : action.provinceList,
          cityList        : [],
          isLocation      : false,
        };
      }
      case  types.UPDATE_SECTOR : {
        return {
          ...state,
          chosenSector    :action.chosenSector,
          chosenProduct   :action.chosenProduct,
          sectorProducts  :action.sectorProducts,
          tier2List       :action.tier2List,
          chosenTier2     :action.chosenTier2,
          tier3List       :action.tier3List,
          chosenTier3     :action.chosenTier3,
          //*stats

          statList        : action.statList,
          chosenStat      : action.chosenStat,
          isStats         : action.isStats || false,
          isLocation      : action.isLocation || false,
          //*country
          
          locationList    : action.locationList,
          chosenCountry   : action.chosenCountry,
          provinceList    : action.provinceList,
          chosenProvince  : action.chosenProvince,
          cityList        : action.CityList,
          chosenCity      : action.chosenCity,
          
        };
      }  
      case  types.GET_DATA_AVG_PRICE_REDUCER : {
        return {
          ...state,
          avgPrice  :  action.dataAVGPrice
        };
      }
      case  types.GET_DATA_PRICE_HISTORY_REDUCER : {
        return {
          ...state,
          historyPrice  :  action.dataPriceHistory
        };
      }
      case  types.UPDATE_DATA_PRICE_HISTORY : {
        return {
          ...state,
          historyPrice  :  null
        };
      }
      case  types.GET_DATA_FILE_REPORT_REDUCER : {
        return {
          ...state,
          fileReport  :  action.fileReport
        };
      }
      case  types.GET_DATA_COMMENT_REDUCER : {
        return {
          ...state,
          commentReport  :  action.commentReport
        };
      }
      case types.LOADING : {
        return {
          ...state,
          isLoading  :  action.loading
        };
      }
      default: { 
        return state;
      }
    }
  };
  // Exports
  export default Product;