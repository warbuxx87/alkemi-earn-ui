// Section 1: React low level imports
import React from "react";
import PropTypes from "prop-types";

// Section 2: Material-UI imports
// import {

import {
    Box,
    Divider,
    Grid,
    Tooltip,
    Typography,
    makeStyles,
} from "@material-ui/core";

// } from "@material-ui/core";

// Section 3: Components & Containers import from the application
import { sumUpTwoNumbers } from "utils/ui";
// Section 4: Define Styles function taking theme as argument and returning an object
const useStyles = makeStyles((theme) => ({
    divider: {
        backgroundColor: "#000000",
        marginTop: 3,
        marginBottom: 4,
    },
    text: {
        fontSize: 11,
    },
}));

// const useStyles = makeStyles((theme) => ({
// }));

// Section 5: Code Component
function APYDisplay({ apy, alkApy }) {
    const classes = useStyles();
    // const classes = useStyles();
    return (
        <>
            <Tooltip
                className={classes.Tooltips}
                title={
                    <React.Fragment>
                        <Box>
                            <Box display="flex">
                                <Box>
                                    <Typography
                                        color="inherit"
                                        variant="body2"
                                        className={classes.text}
                                    >
                                        Network APY:
                                    </Typography>
                                </Box>
                                <Box ml={1.5} flexGrow="1">
                                    <Typography
                                        color="inherit"
                                        variant="body2"
                                        align="right"
                                        className={classes.text}
                                    >
                                        {apy}%
                                    </Typography>
                                </Box>
                            </Box>
                            <Box display="flex">
                                <Box>
                                    <Typography
                                        color="inherit"
                                        variant="body2"
                                        className={classes.text}
                                    >
                                        Rewards APY:
                                    </Typography>
                                </Box>
                                <Box ml={1.5} flexGrow="1">
                                    <Typography
                                        color="inherit"
                                        variant="body2"
                                        align="right"
                                        className={classes.text}
                                    >
                                        {alkApy}%
                                    </Typography>
                                </Box>
                            </Box>{" "}
                            <Box flexGrow="1">
                                <Divider className={classes.divider} />
                            </Box>
                            <Box display="flex">
                                <Box>
                                    <Typography
                                        color="inherit"
                                        variant="overline"
                                        className={classes.text}
                                    >
                                        Total APY:
                                    </Typography>
                                </Box>
                                <Box ml={1.5} flexGrow="1">
                                    <Typography
                                        color="inherit"
                                        variant="body2"
                                        align="right"
                                        className={classes.text}
                                    >
                                        {
                                            /*combined*/ sumUpTwoNumbers(
                                                apy,
                                                alkApy,
                                                2
                                            )
                                        }
                                        %
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </React.Fragment>
                }
                placement="bottom"
                arrow
            >
                <Box>{/*combined*/ sumUpTwoNumbers(apy, alkApy, 2)}%</Box>
            </Tooltip>
        </>
    );
}

// Section 6: Documentation with PropTypes
APYDisplay.propTypes = {
    apy: PropTypes.string.isRequired,
    alkApy: PropTypes.string.isRequired,
};

// Section 7:  Connect styles and export
export default APYDisplay;
