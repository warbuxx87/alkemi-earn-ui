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
import DAI from "assets/images/DAI.svg";
import { formatMoney } from "utils/ui";

// Section 3: Components & Containers import from the application

// Section 4: Define Styles function taking theme as argument and returning an object
const useStyles = makeStyles((theme) => ({
    assetName: {
        marginLeft: theme.spacing(2),
        paddingTop: 1,
    },
    iconFont: {
          fontSize: 12,
          color: "#48D878",
        },

        assetIcon: {
          marginRight: theme.spacing(1.2),
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
            <Box color="#9D9D9D" display="inline-block" mb={2} pl={1.2} >
            <Typography
                variant="h6"
                color="textPrimary"
            >
              Active Lending
              </Typography>
            </Box>

            {/* Card section started*/}
          <Card>
          <Box
            position="relative"
            display="flex"
            alignItems="center"
            p={2}
            >
            <img className={classes.assetIcon} src={DAI} width={24} />
            <Typography
            variant="h5"
            color="textPrimary"
            >
            DAI
            </Typography>
            <Typography
            variant="subtitle2"
            color="textSecondary"
            className={classes.assetName}
            >
            Maker Dai
            </Typography>
            < Box flexGrow={1} />
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
              </Box>
              <Divider />
              <Box p={2}>
              <Grid container>
                <Grid item xl={2} lg={2} md={2} sm={4} xs={4}>
                <Typography
                    variant="body2"
                    color="textPrimary"
                >
                    2,445,656
                  </Typography>
                  <Typography
                      variant="body1"
                      color="textSecondary"
                  >
                    WALLET
                 </Typography>
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
                <Typography
                    variant="body2"
                    color="textPrimary"
                >
                    134,423
                  </Typography>
                  <Typography
                      variant="body1"
                      color="textSecondary"
                  >
                    BALANCE
                  </Typography>
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
                <Typography
                    variant="body2"
                    color="textPrimary"
                >
                    $1344,43
                  </Typography>
                  <Typography
                      variant="body1"
                      color="textSecondary"
                  >
                    BALANCE USED
                 </Typography>
                </Grid>
                <Grid item xl={2} lg={2} md={2} sm={4} xs={4}>
                  <Box className={classes.boxCenter}>
                  <Typography
                      variant="body2"
                      color="textPrimary"
                  >
                      3.45%
                  </Typography>
                  <Typography
                      variant="body1"
                      color="textSecondary"
                  >
                      APR
                  </Typography>
                  </Box>
                </Grid>
                <Grid
                  item
                  xl={2}
                  lg={2}
                  md={2}
                  sm={4}
                  xs={4}
                >
                <Typography
                    variant="body2"
                    color="textPrimary"
                >
                    $7,666.96
                  </Typography>
                  <Typography
                      variant="body1"
                      color="textSecondary"
                  >
                    EARNINGS USD
                  </Typography>
                </Grid>
                <Grid
                  item
                  xl={2}
                  lg={2}
                  md={2}
                  sm={4}
                  xs={4}
                >
                <Typography
                    variant="body2"
                    color="textPrimary"
                >
                    $1344,43
                  </Typography>
                  <Typography
                      variant="body1"
                      color="textSecondary"
                  >
                    BALANCE USED
                 </Typography>
                </Grid>
              </Grid>
            </Box>
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
