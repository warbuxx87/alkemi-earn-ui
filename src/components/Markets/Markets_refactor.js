// Main Component

// Section 1: React low level imports
import React, { useState } from "react";

// Section 2: Material-UI imports
import {
    Box,
    Container,
    Divider,
    Grid,
    makeStyles,
    Tab,
    Tabs,
} from "@material-ui/core";
import "./markets.scss";
import _ from "lodash";

// Section 3: Components & Containers import from the application
import MarketCardSupply from "containers/Markets/CardSupply";
import MarketCardBorrow from "containers/Markets/CardBorrow";
import MarketCardCollateral from "containers/Markets/CardCollateral";

import MarketProgress from "./Progress";
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
const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: "100%",
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(3),
    },
    container: {
        [theme.breakpoints.up("lg")]: {
            paddingLeft: 0,
            paddingRight: 0,
        },
    },
}));

function Markets() {
    const classes = useStyles();

    // Section 5: Code Component
    return (
        <Container maxWidth={false} className={classes.container}>
            <Grid container spacing={3}>
                <Grid item lg={4} sm={6} xs={12}>
                    <MarketCardSupply />
                </Grid>
                <Grid item lg={4} sm={6} xs={12}>
                    <MarketCardBorrow />
                </Grid>
                <Grid item lg={4} sm={6} xs={12}>
                    <MarketCardCollateral />
                </Grid>
                <Grid item lg={12} sm={12} xs={12}>
                    <Box>
                        <Box mt={2}>
                            <MarketProgress
                            // {...supply_item}
                            // key={supply_item.symbol}
                            // type={"supply"}
                            />
                        </Box>
                        <Divider />
                        <Box py={3} pb={6}>
                            <MarketProgress
                            // {...borrow_item}
                            // key={borrow_item.symbol}
                            // type={"borrow"}
                            />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
}

// Section 6: Documentation with PropTypes

// Section 7:  Connect styles and export
export default Markets;

//                 <div className="header">
//                     <div className="header-item supply-balance">
//                         <div className="item-title">
//                             <FormattedMessage id="Total_Supply_Balance" />
//                         </div>
//                         <div className="item-num">
//                             ${" "}
//                             {this.state.data_is_ok &&
//                                 format_str_to_kmb(
//                                     this.state.totals.totalSupplyBalanceUSD.toString()
//                                 )}
//                         </div>
//                     </div>
//
//                     <div className="header-item borrow-balance">
//                         <div className="item-title">
//                             <FormattedMessage id="Total_Borrow_Balance" />
//                         </div>
//                         <div className="item-num item-num-borrow">
//                             $
//                             {this.state.data_is_ok &&
//                                 format_str_to_kmb(
//                                     this.state.totals.totalBorrowBalanceUSD.toString()
//                                 )}
//                         </div>
//                     </div>
//
//                     <div className="header-item collate-rate no-right-margin">
//                         <div className="item-title">
//                             <FormattedMessage id="Total_Collateralization_ratio" />
//                         </div>
//                         <div className="item-num item-num-ratio">
//                             {this.state.data_is_ok &&
//                                 this.state.totals.totalCollateralRatio}
//                             %
//                         </div>
//                     </div>
//                 </div>
//
//                 <div className="total-wrap">
//                     <div className="total-wrap-supply">
//                         <h4>
//                             <FormattedMessage id="Total_Supply" />
//                         </h4>
//                         <div
//                             className="pro_wrap"
//                             style={{ width: "100%", margin: "0 auto" }}
//                         >
//                             {this.state.array_is_ok &&
//                                 this.state.supply_array.map((supply_item) => {
//                                     return (
//                                         <MyProgress
//                                             {...supply_item}
//                                             key={supply_item.symbol}
//                                             type={"supply"}
//                                         />
//                                     );
//                                 })}
//                         </div>
//                     </div>
//
//                     <div className="total-wrap-borrow">
//                         <h4>
//                             <FormattedMessage id="Total_Borrow" />
//                         </h4>
//                         <div
//                             className="pro_wrap"
//                             style={{ width: "100%", margin: "0 auto" }}
//                         >
//                             {this.state.array_is_ok &&
//                                 this.state.borrow_array.map((borrow_item) => {
//                                     return (
//                                         <MyProgress
//                                             {...borrow_item}
//                                             key={borrow_item.symbol}
//                                             type={"borrow"}
//                                         />
//                                     );
//                                 })}
//                         </div>
//                     </div>
//                     <div className="clear"></div>
//                 </div>
//
//                 <div className="all-markets">
//                     <h5>
//                         <FormattedMessage id="All_Markets" />
//                     </h5>
//                     <table>
//                         <thead>
//                             <tr>
//                                 <th>
//                                     <span
//                                         className={
//                                             this.state.cur_language ===
//                                             "English"
//                                                 ? "linheight45"
//                                                 : "linheight30"
//                                         }
//                                     >
//                                         <FormattedMessage id="Market" />
//                                     </span>
//                                 </th>
//                                 <th>
//                                     <span
//                                         className={
//                                             this.state.cur_language ===
//                                             "English"
//                                                 ? "linheight45"
//                                                 : "linheight30"
//                                         }
//                                     >
//                                         <FormattedMessage id="Gross_Supply" />
//                                     </span>
//                                 </th>
//                                 <th>
//                                     <span
//                                         className={
//                                             this.state.cur_language ===
//                                             "English"
//                                                 ? "linheight45"
//                                                 : "linheight30"
//                                         }
//                                     >
//                                         <FormattedMessage id="Supply_APR" />
//                                     </span>
//                                 </th>
//                                 <th>
//                                     <span
//                                         className={
//                                             this.state.cur_language ===
//                                             "English"
//                                                 ? "linheight45"
//                                                 : "linheight30"
//                                         }
//                                     >
//                                         <FormattedMessage id="Gross_Borrow" />
//                                     </span>
//                                 </th>
//                                 <th>
//                                     <span
//                                         className={
//                                             this.state.cur_language ===
//                                             "English"
//                                                 ? "linheight45"
//                                                 : "linheight30"
//                                         }
//                                     >
//                                         <FormattedMessage id="Borrow_APR" />
//                                     </span>
//                                 </th>
//                             </tr>
//                         </thead>
//                     </table>
//                     <div className="body-wrap">
//                         <table>
//                             <tbody>
//                                 {this.state.data_is_ok &&
//                                     this.state.data_markets.map((item) => (
//                                         <tr key={item.address}>
//                                             <td>
//                                                 <img
//                                                     alt={item.name}
//                                                     src={
//                                                         this.state.token[
//                                                             item.symbol
//                                                         ]
//                                                     }
//                                                 />
//                                                 <span className="token-name">
//                                                     {item.name}
//                                                 </span>
//                                                 <span className="token-name-short">
//                                                     {item.symbol}
//                                                 </span>
//                                             </td>
//                                             <td>
//                                                 $
//                                                 {format_str_to_kmb(
//                                                     item.totalSupplyUSD
//                                                 )}
//                                             </td>
//                                             <td>
//                                                 {format_str_to_percent(
//                                                     item.supplyAPR
//                                                 )}
//                                             </td>
//                                             <td>
//                                                 $
//                                                 {format_str_to_kmb(
//                                                     item.totalBorrowUSD
//                                                 )}
//                                             </td>
//                                             <td>
//                                                 {format_str_to_percent(
//                                                     item.borrowAPR
//                                                 )}
//                                             </td>
//                                         </tr>
//                                     ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//
//         );
//     }
// }
