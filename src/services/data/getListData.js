import axios from '../configApi';
const locale = 'en';

export const getListData = async (data) => {
  try {
    const result = await axios(`api/${locale}/data-search/latest-price`, { 
        method: "POST",
        data : data,
        headers: {
          Accept: "application/json",
        //   'USER-TOKEN': ''
        },
      })
    return result.data;
    /*const listData = {
      "data": {
          "products": [
              {
                  "survey_id": 128,
                  "country_id": 32,
                  "sector_variant_id": 441,
                  "sector_id": 29,
                  "price": 0.621,
                  "variation": "decrease",
                  "default_field": 814,
                  "start_date": "2020-02-10",
                  "end_date": "2020-02-16",
                  "name": "Amino Acids, Lysine (70%, Sulphate), Transact Price (Local)",
                  "currency": "USD",
                  "product_id": 327,
                  "sub_category_1_id": 366,
                  "sub_category_2_id": 441
              },
              {
                  "survey_id": 128,
                  "country_id": 32,
                  "sector_variant_id": 445,
                  "sector_id": 29,
                  "price": 0.961,
                  "variation": "decrease",
                  "default_field": 814,
                  "start_date": "2020-02-10",
                  "end_date": "2020-02-16",
                  "name": "Amino Acids, Lysine (98.5%, Hydrochloride), Transact Price (Local)",
                  "currency": "USD",
                  "product_id": 327,
                  "sub_category_1_id": 368,
                  "sub_category_2_id": 445
              },
              {
                  "survey_id": 128,
                  "country_id": 32,
                  "sector_variant_id": 449,
                  "sector_id": 29,
                  "price": 0.971,
                  "variation": "decrease",
                  "default_field": 814,
                  "start_date": "2020-02-10",
                  "end_date": "2020-02-16",
                  "name": "Amino Acids, Threonine (98.5%), Transact Price (Local)",
                  "currency": "USD",
                  "product_id": 327,
                  "sub_category_1_id": 370,
                  "sub_category_2_id": 449
              },
              {
                  "survey_id": 128,
                  "country_id": 32,
                  "sector_variant_id": 453,
                  "sector_id": 29,
                  "price": 6.078,
                  "variation": "decrease",
                  "default_field": 814,
                  "start_date": "2020-02-10",
                  "end_date": "2020-02-16",
                  "name": "Amino Acids, Tryptophan (98%), Transact Price (Local)",
                  "currency": "USD",
                  "product_id": 327,
                  "sub_category_1_id": 372,
                  "sub_category_2_id": 453
              },
              {
                  "survey_id": 128,
                  "country_id": 32,
                  "sector_variant_id": 457,
                  "sector_id": 29,
                  "price": 2.566,
                  "variation": "decrease",
                  "default_field": 814,
                  "start_date": "2020-02-10",
                  "end_date": "2020-02-16",
                  "name": "Amino Acids, Methionine (99%, DL), Transact Price (Local)",
                  "currency": "USD",
                  "product_id": 327,
                  "sub_category_1_id": 374,
                  "sub_category_2_id": 457
              },
              {
                  "survey_id": 128,
                  "country_id": 32,
                  "sector_variant_id": 465,
                  "sector_id": 29,
                  "price": 1.897,
                  "variation": "increase",
                  "default_field": 814,
                  "start_date": "2020-02-10",
                  "end_date": "2020-02-16",
                  "name": "Minerals, Copper Sulphate, Transact Price (Local)",
                  "currency": "USD",
                  "product_id": 326,
                  "sub_category_1_id": 358,
                  "sub_category_2_id": 465
              },
              {
                  "survey_id": 128,
                  "country_id": 32,
                  "sector_variant_id": 469,
                  "sector_id": 29,
                  "price": 0.172,
                  "variation": "increase",
                  "default_field": 814,
                  "start_date": "2020-02-10",
                  "end_date": "2020-02-16",
                  "name": "Minerals, Ferrous Sulphate, Transact Price (Local)",
                  "currency": "USD",
                  "product_id": 326,
                  "sub_category_1_id": 359,
                  "sub_category_2_id": 469
              },
              {
                  "survey_id": 128,
                  "country_id": 32,
                  "sector_variant_id": 473,
                  "sector_id": 29,
                  "price": 2.154,
                  "variation": "increase",
                  "default_field": 814,
                  "start_date": "2020-02-10",
                  "end_date": "2020-02-16",
                  "name": "Minerals, Zinc Oxide, Transact Price (Local)",
                  "currency": "USD",
                  "product_id": 326,
                  "sub_category_1_id": 360,
                  "sub_category_2_id": 473
              },
              {
                  "survey_id": 128,
                  "country_id": 32,
                  "sector_variant_id": 474,
                  "sector_id": 29,
                  "price": 0.473,
                  "variation": "increase",
                  "default_field": 814,
                  "start_date": "2020-02-10",
                  "end_date": "2020-02-16",
                  "name": "Minerals, Monocalcium Phosphate, Transact Price (Local)",
                  "currency": "USD",
                  "product_id": 326,
                  "sub_category_1_id": 365,
                  "sub_category_2_id": 474
              },
              {
                  "survey_id": 128,
                  "country_id": 32,
                  "sector_variant_id": 478,
                  "sector_id": 29,
                  "price": 0.326,
                  "variation": "increase",
                  "default_field": 814,
                  "start_date": "2020-02-10",
                  "end_date": "2020-02-16",
                  "name": "Minerals, Calcium Hydrogen Phosphate (18%), Transact Price (Local)",
                  "currency": "USD",
                  "product_id": 326,
                  "sub_category_1_id": 364,
                  "sub_category_2_id": 478
              }
          ],
          "position": 10,
          "total": 73
      },
      "errors": null
  }
  return listData;*/
  } catch (error) {
    return Promise.reject(error);
  }
};
