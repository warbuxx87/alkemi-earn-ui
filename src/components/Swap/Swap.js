// Main component

// Section 1: React low level imports
import React from "react";
import clsx from "clsx";

// Section 2: Material-UI imports
import {
    Box,
    Button,
    Collapse,
    Card,
    FormControl,
    FormControlLabel,
    Grid,
    makeStyles,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";

import SwapVertIcon from "@material-ui/icons/SwapVert";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

// Section 3: Components & Containers import from the application

// Section 4: Define Styles function taking theme as argument and returning an object
const useStyles = makeStyles((theme) => ({
    root: {
        marginLeft: 250,
        marginRight: 10,
    },
    heading: {
        fontSize: "1rem",
        fontWeight: theme.typography.fontWeightRegular,
    },
    container: {
        [theme.breakpoints.up("lg")]: {
            paddingLeft: 0,
            paddingRight: 0,
        },
    },
    inputWrap: {
        position: "relative",
    },
    maxTips: {
        position: "absolute",
        right: "15px",
        top: "26px",
        cursor: "pointer",
        color: "#ffffff",
        fontSize: "12px",
    },
    textinput: {
        "& .MuiFilledInput-root": {
            borderRadius: "0px 4px 4px 0px",
            fontSize: "20px",
            height: "65px",
        },
        "& label.Mui-focused": {
            color: "#868998",
        },
    },
    // Autocomplete dropdown
    selectasset: {
        backgroundColor: "#040404",
        borderRadius: "4px 0px 0px 4px",
        "& .MuiInputBase-root": {
            height: "65px",
        },
        "& .MuiOutlinedInput-notchedOutline": {
            border: "none",
            borderRadius: "4px 0px 0px 4px",
        },
        "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
            border: "2px solid #000000",
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
            border: "2px solid #000000",
        },
    },
    // collapse Div
    expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: "rotate(180deg)",
    },
    togglebutton: {
        textTransform: "none",
        textAlign: "left",
        minWidth: 100,
        justifyContent: "flex-start",
        paddingLeft: 20,
    },
    // Fees & Rates
    vertCent: {
        margin: "auto",
    },
    rateInfo: {
        color: "white",
        fontSize: "14px",
        marginTop: "20px",
    },
    rateRow: {
        padding: "12px 0",
        borderBottom: "1px dashed #57595d",
    },
    feeRow: {
        padding: "12px 0",
    },
}));

const assets = [
    {
        value: "DAI",
    },
    {
        value: "USDC",
    },
    {
        value: "WBTC",
    },
    {
        value: "WETH",
    },
];

// Section 5: Code Component
const Swap = ({ ...rest }) => {
    const classes = useStyles();

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const [alignment, setAlignment] = React.useState("left");

    const handleAlignment = (event, newAlignment) => {
        setAlignment(newAlignment);
    };

    const [value, setValue] = React.useState("0.5");

    const handleChanges = (event) => {
        setValue(event.target.value);
    };

    return (
        <Box display="flex" justifyContent="center">
            <Box maxWidth={500} width={1} mt={2} mx={2}>
                <Card>
                    <Box px={2} pt={2} pb={1}>
                        <Box>
                            <Box>
                                <Box pb={1}>
                                    <Typography
                                        variant="h5"
                                        color="textPrimary"
                                    >
                                        You Send
                                    </Typography>
                                </Box>
                                <Box display="flex" width={1}>
                                    <Autocomplete
                                        id="combo"
                                        className={classes.selectasset}
                                        options={assets}
                                        popper
                                        getOptionLabel={(option) =>
                                            option.value
                                        }
                                        style={{ width: 180 }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant="outlined"
                                            />
                                        )}
                                    />
                                    <Box
                                        className={classes.inputWrap}
                                        width={1}
                                    >
                                        <TextField
                                            id="filled-required"
                                            autoFocus={true}
                                            label="Balance: 124,233.00"
                                            disableUnderline={true}
                                            className={classes.textinput}
                                            placeholder="0.00"
                                            fullWidth={true}
                                            variant="filled"
                                            InputLabelProps={{ shrink: true }}
                                            InputProps={{
                                                disableUnderline: true,
                                            }}
                                        />
                                        <span className={classes.maxTips}>
                                            MAX
                                        </span>
                                        {/* onClick={() => { click_max(this) }} */}
                                    </Box>
                                </Box>
                            </Box>
                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                mt={3}
                                mb={1}
                            >
                                <SwapVertIcon style={{ fontSize: 32 }} />
                            </Box>
                            <Box>
                                <Box pb={1}>
                                    <Typography
                                        variant="h5"
                                        color="textPrimary"
                                    >
                                        You Recieve
                                    </Typography>
                                </Box>
                                <Box display="flex" width={1}>
                                    <Autocomplete
                                        id="combo"
                                        className={classes.selectasset}
                                        options={assets}
                                        popper
                                        getOptionLabel={(option) =>
                                            option.value
                                        }
                                        style={{ width: 180 }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant="outlined"
                                            />
                                        )}
                                    />
                                    <Box
                                        className={classes.inputWrap}
                                        width={1}
                                    >
                                        <TextField
                                            id="filled-required"
                                            autoFocus={true}
                                            label="Balance: 0.00"
                                            disableUnderline={true}
                                            className={classes.textinput}
                                            placeholder="0.00"
                                            fullWidth={true}
                                            variant="filled"
                                            InputLabelProps={{ shrink: true }}
                                            InputProps={{
                                                disableUnderline: true,
                                            }}
                                        />
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                        <Grid className={classes.rateInfo}>
                            <Grid container className={classes.rateRow}>
                                <Grid
                                    item
                                    md={6}
                                    xs
                                    className={classes.vertCent}
                                >
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                    >
                                        Exchange Rate
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs
                                    container
                                    justify="flex-end"
                                >
                                    <Typography
                                        variant="body2"
                                        color="textPrimary"
                                    >
                                        1 DAI = 1 DAI
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid container className={classes.feeRow}>
                                <Grid
                                    item
                                    md={6}
                                    xs
                                    className={classes.vertCent}
                                >
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                    >
                                        Transtaction Fees
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    md={6}
                                    xs
                                    container
                                    justify="flex-end"
                                >
                                    <Typography
                                        variant="body2"
                                        color="textPrimary"
                                    >
                                        0.00
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Box mt={2}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                fullWidth="true"
                            >
                                SWAP DAI
                            </Button>
                        </Box>
                        <Box textAlign="center" mt={1}>
                            <Button
                                color="secondary"
                                size="small"
                                style={{
                                    backgroundColor: "transparent",
                                    color: "#969696",
                                }}
                                onClick={handleExpandClick}
                                aria-expanded={expanded}
                                endIcon={
                                    <ExpandMoreIcon
                                        className={clsx(classes.expand, {
                                            [classes.expandOpen]: expanded,
                                        })}
                                    />
                                }
                            >
                                Advanced Options
                            </Button>
                        </Box>
                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            <Box my={2}>
                                <Typography variant="h6" color="textPrimary">
                                    Slippage
                                </Typography>
                                <Box>
                                    <FormControl component="fieldset">
                                        <RadioGroup
                                            aria-label="slippage"
                                            name="slippage"
                                            value={value}
                                            onChange={handleChanges}
                                            row
                                        >
                                            <FormControlLabel
                                                value="0.5"
                                                control={<Radio size="small" />}
                                                label="0.5%"
                                            />
                                            <FormControlLabel
                                                value="1"
                                                control={<Radio size="small" />}
                                                label="1%"
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </Box>
                                <Box mt={2}>
                                    <Box mb={1}>
                                        <Typography
                                            variant="h6"
                                            color="textPrimary"
                                        >
                                            Gas Price
                                        </Typography>
                                    </Box>
                                    <ToggleButtonGroup
                                        value={alignment}
                                        exclusive
                                        onChange={handleAlignment}
                                        aria-label="text alignment"
                                    >
                                        <ToggleButton
                                            className={classes.togglebutton}
                                            value="left"
                                            aria-label="left aligned"
                                        >
                                            <Box>
                                                <Typography
                                                    variant="body1"
                                                    color="textPrimary"
                                                >
                                                    Slow
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="textSecondary"
                                                >
                                                    $0.09
                                                </Typography>
                                            </Box>
                                        </ToggleButton>
                                        <ToggleButton
                                            className={classes.togglebutton}
                                            value="center"
                                            aria-label="centered"
                                        >
                                            <Box>
                                                <Typography
                                                    variant="h6"
                                                    color="textPrimary"
                                                >
                                                    Average
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="textSecondary"
                                                >
                                                    $0.45
                                                </Typography>
                                            </Box>
                                        </ToggleButton>
                                        <ToggleButton
                                            className={classes.togglebutton}
                                            value="right"
                                            aria-label="right aligned"
                                        >
                                            <Box>
                                                <Typography
                                                    variant="h6"
                                                    color="textPrimary"
                                                >
                                                    Fast
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color="textSecondary"
                                                >
                                                    $1.34
                                                </Typography>
                                            </Box>
                                        </ToggleButton>
                                    </ToggleButtonGroup>
                                </Box>
                            </Box>
                        </Collapse>
                    </Box>
                </Card>
            </Box>
        </Box>
    );
};

// Section 6: Documentation with PropTypes

// Section 7:  Export
export default Swap;
