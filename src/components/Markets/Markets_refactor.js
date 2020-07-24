// // Main Component
//
// // Section 1: React low level imports
// import React, { useState } from "react";
//
// // Section 2: Material-UI imports
// import {
//     Box,
//     Container,
//     Divider,
//     Grid,
//     makeStyles,
//     Tab,
//     Tabs,
// } from "@material-ui/core";
// import "./markets.scss";
// import _ from "lodash";
//
// // Section 3: Components & Containers import from the application
// import MarketCardSupply from "containers/Markets/CardSupply";
// import MarketCardBorrow from "containers/Markets/CardBorrow";
// import MarketCardCollateral from "containers/Markets/CardCollateral";
//
// import MarketProgress from "./Progress";
// import WETH from "assets/images/WETH.svg";
// import USDT from "assets/images/USDT.svg";
// import WBTC from "assets/images/WBTC.svg";
// import DAI from "assets/images/DAI.svg";
// import USDC from "assets/images/USDC.svg";
// // png
// import PAX from "assets/images/pax.png";
//
// import {
//     compare_supply,
//     compare_borrow,
//     format_str_to_kmb,
//     format_str_to_percent,
// } from "utils/markets";
//
// // Section 4: Define Styles function taking theme as argument and returning an object
// const useStyles = makeStyles((theme) => ({
//     root: {
//         backgroundColor: theme.palette.background.dark,
//         minHeight: "100%",
//         paddingTop: theme.spacing(3),
//         paddingBottom: theme.spacing(3),
//     },
//     container: {
//         [theme.breakpoints.up("lg")]: {
//             paddingLeft: 0,
//             paddingRight: 0,
//         },
//     },
// }));
//
// function Markets() {
//     const classes = useStyles();
//
//     // Section 5: Code Component
//     return (
//         <Container maxWidth={false} className={classes.container}>
//             <Grid container spacing={3}>
//                 <Grid item lg={4} sm={6} xs={12}>
//                     <MarketCardSupply />
//                 </Grid>
//                 <Grid item lg={4} sm={6} xs={12}>
//                     <MarketCardBorrow />
//                 </Grid>
//                 <Grid item lg={4} sm={6} xs={12}>
//                     <MarketCardCollateral />
//                 </Grid>
//                 <Grid item lg={12} sm={12} xs={12}>
//                     <Box>
//                         <Box mt={2}>
//                             <MarketProgress
//                             // {...supply_item}
//                             // key={supply_item.symbol}
//                             // type={"supply"}
//                             />
//                         </Box>
//                         <Divider />
//                         <Box py={3} pb={6}>
//                             <MarketProgress
//                             // {...borrow_item}
//                             // key={borrow_item.symbol}
//                             // type={"borrow"}
//                             />
//                         </Box>
//                     </Box>
//                 </Grid>
//             </Grid>
//         </Container>
//     );
// }
//
// // Section 6: Documentation with PropTypes
//
// // Section 7:  Connect styles and export
// export default Markets;
