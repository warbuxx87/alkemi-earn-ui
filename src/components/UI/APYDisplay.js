// Section 1: React low level imports
import React from "react";
import PropTypes from "prop-types";

// Section 2: Material-UI imports
// import {

import {
    Box,
    Divider,
    Tooltip,
    Typography,
    makeStyles,
} from "@material-ui/core";

// } from "@material-ui/core";

// Section 3: Components & Containers import from the application
import {
    sumUpTwoNumbers,
    negativeValueOfNumber,
    isStringNumberPositive,
    absoluteValue,
} from "utils/ui";
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

// typeOfAPY is lend or borrow
function APYDisplay({ apy, alkApy, showTooltip, typeOfAPY }) {
    const classes = useStyles();

    const displayTypeOfApyLabel = ({ typeOfAPY }) => {
        if (typeOfAPY === "lend") {
            return "Lending";
        } else if (typeOfAPY === "borrow") {
            return "Borrowing";
        } else {
            return "Network";
        }
    };

    const displayCombinedValue = ({ apy, alkApy, typeOfAPY }) => {
        if (typeOfAPY === "borrow") {
            const borrowAPY = sumUpTwoNumbers(
                negativeValueOfNumber(apy, 2),
                alkApy,
                2
            );

            const absBorrowAPY = absoluteValue(borrowAPY, 2);
            return `${absBorrowAPY}%`;
        } else {
            return `${sumUpTwoNumbers(apy, alkApy, 2)}%`;
        }
    };

    const displayToolTip = () => {
        return (
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
                                        {displayTypeOfApyLabel({ typeOfAPY })}{" "}
                                        APY:
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
                                            /*combined*/ displayCombinedValue({
                                                apy,
                                                alkApy,
                                                typeOfAPY,
                                            })
                                        }
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                    </React.Fragment>
                }
                placement="bottom"
                arrow
            >
                <Box>
                    {
                        /*combined*/ displayCombinedValue({
                            apy,
                            alkApy,
                            typeOfAPY,
                        })
                    }
                </Box>
            </Tooltip>
        );
    };
    // const classes = useStyles();
    return (
        <>
            {showTooltip === false
                ? displayCombinedValue({ apy, alkApy, typeOfAPY })
                : displayToolTip({ apy, alkApy, typeOfAPY })}
        </>
    );
}

// Section 6: Documentation with PropTypes
APYDisplay.propTypes = {
    apy: PropTypes.string.isRequired,
    alkApy: PropTypes.string.isRequired,
    showTooltip: PropTypes.bool.isRequired,
    typeOfAPY: PropTypes.string.isRequired,
};

// Section 7:  Connect styles and export
export default APYDisplay;
