// Sub Component

// Section 1: React low level imports
import React from "react";
import PropTypes from "prop-types";

// Section 2: Material-UI imports
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Container,
    Divider,
    Grid,
    Typography,
    makeStyles,
} from "@material-ui/core";
import { FiberManualRecord } from "@material-ui/icons";
import DAI from "assets/images/dai.png";
import { formatMoney } from "utils/ui";

// Section 3: Components & Containers import from the application

// Section 4: Define Styles function taking theme as argument and returning an object
const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(3),
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    iconFont: {
          fontSize: 12,
          color: "#48D878",
        },
        float: {
          float: "right",
        },
        DiaIcon: {
          marginRight: 10,
          transform: "translate(0px, 4px)",
        },
        maker: {
          fontSize: 16,
          color: "#525254",
          marginLeft: 14,
        },
        btnDefault: {
          backgroundColor: "#3A3B3C",
          marginLeft: 12,
          color: "#B1B2B2",
          textTransform: "capitalize",
          "&:hover": {
            color: "#000",
          },
          [theme.breakpoints.down("xs")]: {
            marginLeft: 3,
          },
        },
        center: {
          textAlign: "center",
        },
        right: {
          justifyContent: "right",
          position: "relative",
          display: "grid",
        },
        FormGroup: {
          flexDirection: "row-reverse",
        },
        smCenter: {
          [theme.breakpoints.down("sm")]: {
            textAlign: "center",
          },
        },
        smRight: {
          [theme.breakpoints.down("sm")]: {
            textAlign: "right",
            marginBottom: 20,
          },
        },
        boxCenter: {
          marginLeft: 40,
          [theme.breakpoints.down("sm")]: {
            marginLeft: 0,
          },
        },
}));

function CardAsset({
    className,
    totalDeposit,
    currency,
    difference,
    ...rest
}) {
    const classes = useStyles();

    // Section 5: Code Component
    return (
      <div className={classes.Root}>
          <Box>
            {/* Active Badge */}
            <FiberManualRecord className={classes.iconFont} />
            <Box color="#9D9D9D" display="inline-block" fontWeight={600} pl={1.2}>
              Active Lending
            </Box>

            {/* Card section started*/}
          <Card>
          <CardContent>
              <Box fontWeight={600} color="#F0F0F0">
                <img className={classes.DiaIcon} src={DAI} width={22} />
                DAI <span className={classes.maker}>Maker Dai</span>
                <span className={classes.float}>
                  <Button
                    className={classes.btnDefault}
                    size="small"
                    variant="contained"
                  >
                    Redeem
                  </Button>
                  <Button
                    className={classes.btnDefault}
                    size="small"
                    variant="contained"
                  >
                    Supply
                  </Button>
                </span>
              </Box>
              <Box mt={2} mb={1} pb={2} borderTop="1.5px solid #0a0a0a" />
              <Grid container>
                <Grid item xl={2} lg={2} md={2} sm={4} xs={4}>
                  <Box fontWeight={600} py={0.5} color="#F0F0F0">
                    2,445,656
                  </Box>
                  <Box fontWeight={600} fontSize={12} mt={0.5} color="#525254">
                    WALLET
                  </Box>
                </Grid>
                <Grid
                  item
                  xl={2}
                  lg={2}
                  md={2}
                  sm={4}
                  xs={4}
                  className={classes.smCenter}
                >
                  <Box fontWeight={600} py={0.5} color="#F0F0F0">
                    134,423
                  </Box>
                  <Box fontWeight={600} fontSize={12} mt={0.5} color="#525254">
                    BALANCE
                  </Box>
                </Grid>
                <Grid
                  item
                  xl={2}
                  lg={2}
                  md={2}
                  sm={4}
                  xs={4}
                  className={classes.smRight}
                >
                  <Box fontWeight={600} py={0.5} color="#F0F0F0">
                    $1344,43
                  </Box>
                  <Box fontWeight={600} fontSize={12} mt={0.5} color="#525254">
                    BALANCE USED
                  </Box>
                </Grid>
                <Grid item xl={2} lg={2} md={2} sm={4} xs={4}>
                  <Box className={classes.boxCenter}>
                    <Box
                      fontWeight={600}
                      py={0.5}
                      bgcolor="#1e322d"
                      display="inline-block"
                      color="#18A171"
                      px={1}
                    >
                      3.45%
                    </Box>
                    <Box fontWeight={600} fontSize={12} mt={0.5} color="#525254">
                      APR
                    </Box>
                  </Box>
                </Grid>
                <Grid
                  item
                  xl={2}
                  lg={2}
                  md={2}
                  sm={4}
                  xs={4}
                  className={classes.center}
                >
                  <Box fontWeight={600} py={0.5} color="#F0F0F0">
                    $7,666.96
                  </Box>
                  <Box fontWeight={600} fontSize={12} mt={0.5} color="#525254">
                    EARNINGS USD
                  </Box>
                </Grid>
                <Grid
                  item
                  xl={2}
                  lg={2}
                  md={2}
                  sm={4}
                  xs={4}
                  className={classes.right}
                >
                  text
                  <Box fontWeight={600} fontSize={12} mt={1.3} color="#525254">
                    COLLATERAL
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
            </Card>
          </Box>
        </div>
    );
}

// Section 6: Documentation with PropTypes
CardAsset.propTypes = {
    className: PropTypes.string,
};

// Section 7:  Connect styles and export
export default CardAsset;
