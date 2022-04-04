// Section 1: React low level imports
import React from "react";
import PropTypes from "prop-types";

import clsx from "clsx";

// Section 2: Material-UI imports

import {
    Box,
    Divider,
    Tooltip,
    Typography,
    makeStyles,
    fade,
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

    // Base styling
    baseLabelStyling: {
        alignItems: "center",
        display: "inline-flex",
        flexGrow: 0,
        whiteSpace: "nowrap",
        cursor: "default",
        flexShrink: 0,
        justifyContent: "center",
        letterSpacing: 0.5,
        minWidth: 20,
        textTransform: "uppercase",
    },

    // Base regular styling
    baseRegularLabelStyling: {
        fontFamily: theme.typography.fontFamily,
        borderRadius: 2,
        height: 24,
        padding: theme.spacing(0.5, 0.5),
    },

    warningRegularLabel: {
        color: theme.palette.warning.main,
        backgroundColor: fade(theme.palette.warning.main, 0.08),
    },

    successRegularLabel: {
        color: theme.palette.success.main,
        backgroundColor: fade(theme.palette.success.main, 0.08),
    },

    baseBigLabelStyling: {
        borderRadius: 4,
        padding: theme.spacing(0, 1),
    },

    warningBigLabel: {
        // similar styling reside in UI/CardAPY.js
        color: theme.palette.warning.main,
        backgroundColor: fade(theme.palette.warning.main, 0.08),
    },
    successBigLabel: {
        color: theme.palette.success.main,
        backgroundColor: fade(theme.palette.success.main, 0.08),
    },

    successNumberOnly: {
        color: theme.palette.success.main,
    },

    warningNumberOnly: {
        color: theme.palette.warning.main,
    },

    defaultLabel: {},
}));

// const useStyles = makeStyles((theme) => ({
// }));

// Section 5: Code Component

// typeOfAPY is lend or borrow
function APYDisplay({ apy, alkApy, showTooltip, typeOfAPY, typeOfLabel }) {
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

    const calculateAPY = ({ apy, alkApy, typeOfAPY }) => {
        if (typeOfAPY === "borrow") {
            const borrowAPY = sumUpTwoNumbers(
                negativeValueOfNumber(apy, 2),
                alkApy,
                2
            );

            return `${borrowAPY}`;
        } else {
            return `${sumUpTwoNumbers(apy, alkApy, 2)}`;
        }
    };

    const displayCombinedValue = ({ apy, alkApy, typeOfAPY }) => {
        const calculatedCombinedAPY = calculateAPY({ apy, alkApy, typeOfAPY });

        if (typeOfAPY === "borrow") {
            return `${absoluteValue(calculatedCombinedAPY, 2)}%`;
        } else {
            return `${calculatedCombinedAPY}%`;
        }
    };

    const selectLabelStyling = ({ apy, alkApy, typeOfAPY, typeOfLabel }) => {
        let setTypeOfLabel = typeOfLabel;
        if (!setTypeOfLabel) setTypeOfLabel = "Regular"; // default

        const isPositive = isStringNumberPositive(
            calculateAPY({ apy, alkApy, typeOfAPY })
        );

        let labelStyling = classes.defaultLabel;

        if (typeOfLabel === "NumberOnly") {
            labelStyling =
                classes[`${!isPositive ? "warning" : "success"}NumberOnly`];
        } else {
            labelStyling = clsx(
                classes.baseLabelStyling,
                classes[`base${setTypeOfLabel}LabelStyling`],
                classes[
                    !isPositive
                        ? `warning${setTypeOfLabel}Label`
                        : `success${setTypeOfLabel}Label`
                ]
            );
        }

        return labelStyling;
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
            {typeOfLabel === "NumberOnly" ? (
                <Typography
                    variant="h3"
                    color="textPrimary"
                    align="right"
                    className={selectLabelStyling({
                        apy,
                        alkApy,
                        typeOfAPY,
                        typeOfLabel,
                    })}
                >
                    {showTooltip === false
                        ? displayCombinedValue({ apy, alkApy, typeOfAPY })
                        : displayToolTip()}
                </Typography>
            ) : (
                <Typography
                    variant={typeOfLabel === "Big" ? "h2" : "body1"} // defaults to regular config
                    className={selectLabelStyling({
                        apy,
                        alkApy,
                        typeOfAPY,
                        typeOfLabel,
                    })}
                >
                    {showTooltip === false
                        ? displayCombinedValue({ apy, alkApy, typeOfAPY })
                        : displayToolTip()}
                </Typography>
            )}
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
