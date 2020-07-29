// Sub Component

// Section 1: React low level imports
import React from "react";
import _ from "lodash";

// Section 2: Material-UI imports
import {
    Box,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { formatMoney, formatPercent } from "utils/ui";


import WETH from "assets/images/WETH.svg";
import USDT from "assets/images/USDT.svg";
import WBTC from "assets/images/WBTC.svg";
import DAI from "assets/images/DAI.svg";
import USDC from "assets/images/USDC.svg";
// png
import PAX from "assets/images/pax.png";

import {
    compare_supply,
    compare_borrow,
    format_str_to_kmb,
    format_str_to_percent,
} from "utils/markets";

// Section 4: Define Styles function taking theme as argument and returning an object
const useStyles = theme => ({
  root: {
      padding: theme.spacing(3),
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
  },
  label: {
      marginLeft: theme.spacing(1),
  },
  item: {
      textAlign: "center",
      justifyContent: "center",
  },
});

class TotalCollateral extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data_is_ok: false,
            token: {
                WETH: WETH,
                USDT: USDT,
                USDC: USDC,
                PAX: PAX,
                WBTC: WBTC,
                DAI: DAI,
            },
            cur_language: navigator.language === "zh-CN" ? "中文" : "English",
            arr_token: [
                "0x249987094de97C9612b8d04C15Ca8273e43C20AC", // usdt
                "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa", // dai
                "0xC8b1a5ef2e19937dd6c0f804DF2e3efE9F093B1e", // weth
                "0x4DBCdF9B62e891a7cec5A2568C3F4FAF9E8Abe2b", // usdc
                "0x722E6238335d89393A42e2cA316A5fb1b8B2EB55", // pax
                "0x577d296678535e4903d59a4c929b718e1d575e0a", // wbtc
            ],
        };

        // product
        this.markets_api = "https://api.alkemi.network/markets";

        this.get_markets_data();

        // refresh api data every 15 seconds
        this.timer = setInterval(() => {
            this.get_markets_data();
        }, 1000 * 15);
    }

    get_markets_data = () => {
        fetch(this.markets_api)
            .then((res) => {
                return res.text();
            })
            .then((data) => {
                if (data) {
                    let obj_data = JSON.parse(data);
                    // console.log("obj_data", obj_data);

                    let arr_markets = [];
                    let key_markets = Object.keys(obj_data);
                    // console.log("key_markets", key_markets);

                    for (var i = 0; i < key_markets.length; i++) {
                        arr_markets.push(obj_data[key_markets[i]]);
                    }
                    // console.log("arr_markets", arr_markets);

                    let arr_items = [];

                    let asset;
                    let totalSupplyBalanceUSD = 0;
                    let totalBorrowBalanceUSD = 0;

                    for (var x = 0; x < arr_markets.length; x++) {
                        let key_items = Object.values(arr_markets[x]);

                        asset = key_items[0];

                        totalSupplyBalanceUSD += parseFloat(
                            asset.totalSupplyUSD
                        );
                        totalBorrowBalanceUSD += parseFloat(
                            asset.totalBorrowUSD
                        );

                        arr_items.push(asset);
                    }
                    // console.log("arr_items", arr_items);

                    let totalCollateralRatio =
                        (totalSupplyBalanceUSD / totalBorrowBalanceUSD) * 100;

                    let totals = {};

                    totals.totalSupplyBalanceUSD = totalSupplyBalanceUSD.toFixed(
                        2
                    );
                    totals.totalBorrowBalanceUSD = totalBorrowBalanceUSD.toFixed(
                        2
                    );
                    totals.totalCollateralRatio = totalCollateralRatio.toFixed(
                        2
                    );

                    arr_markets = arr_items;
                    // return;

                    this.setState(
                        {
                            data: obj_data,
                            data_is_ok: true,
                            data_markets: arr_markets,
                            totals: totals,
                        },
                        () => {
                            var supply_array = _.cloneDeep(
                                this.state.data_markets
                            );
                            var borrow_array = _.cloneDeep(
                                this.state.data_markets
                            );

                            supply_array.sort(compare_supply);
                            borrow_array.sort(compare_borrow);

                            for (var i = 0; i < supply_array.length; i++) {
                                supply_array[i].percentage_supply = Number(
                                    (supply_array[i].totalSupplyUSD /
                                        this.state.totals
                                            .totalSupplyBalanceUSD) *
                                        100
                                ).toFixed(1);
                            }
                            for (var j = 0; j < borrow_array.length; j++) {
                                borrow_array[j].percentage_borrow = Number(
                                    (borrow_array[j].totalBorrowUSD /
                                        this.state.totals
                                            .totalBorrowBalanceUSD) *
                                        100
                                ).toFixed(1);
                            }

                            this.setState({
                                supply_array: supply_array,
                                borrow_array: borrow_array,
                                array_is_ok: true,
                            });
                        }
                    );
                }
            });
    };

    render() {
       const { classes } = this.props;

    // Section 5: Code Component
    return (
      <Card>
          <CardHeader title="Collateral Ratio" className={classes.item} />
          <Divider />
          <CardContent>
              <Box
                  className={classes.item}
                  mt={2}
                  mb={1}
                  display="flex"
                  alignItems="center"
                  flexWrap="wrap"
              >
                  <Typography variant="h3" color="textPrimary">
                  {this.state.data_is_ok &&
                      this.state.totals.totalCollateralRatio}
                  %
                  </Typography>
              </Box>
          </CardContent>
      </Card>
      );
  }
}

// Section 6: Documentation with PropTypes


// Section 7:  Connect styles and export
export default withStyles(useStyles)(TotalCollateral);
