// Main Component

// Section 1: React low level imports
import React, { useState, useRef } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { Translate } from "react-redux-i18n";

// Section 2: Material-UI imports
import {
    Box,
    FormControlLabel,
    IconButton,
    Popover,
    SvgIcon,
    Switch,
    TextField,
    Tooltip,
    Typography,
    makeStyles,
} from "@material-ui/core";

// Section 3: Components & Containers import from the application
import { Settings as SettingsIcon } from "react-feather";
import { supportedLocales } from "../../constants/i18n";
import { setLocaleWithFallback } from "../../redux/actions/i18n";

// Section 4: Define Styles function taking theme as argument and returning an object
const useStyles = makeStyles((theme) => ({
    popover: {
        width: 320,
        padding: theme.spacing(2),
    },
}));

const currencies = [
    {
        id: "USD",
        name: "USD - US Dollars",
    },
    {
        id: "BRL",
        name: "BRL - Brazilian Rial",
    },
    {
        id: "EUR",
        name: "EUR - Euro",
    },
];

function Settings(props) {
    const classes = useStyles();
    const ref = useRef(null);
    const [isOpen, setOpen] = useState(false);
    const [values, setValues] = useState({
        language: props.locale,
        currency: "USD",
    });

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCurrencyChange = (event) => {
        setValues({
            ...values,
            currency: event.target.value,
        });
    };

    const handleLanguageChange = (event) => {
        event.preventDefault();
        setValues({
            ...values,
            language: event.target.value,
        });

        props.setLocaleWithFallback(event.target.value);
    };

    // Section 5: Code Component
    return (
        <>
            <Tooltip title=<Translate value="Settings" />>
                <IconButton color="inherit" onClick={handleOpen} ref={ref}>
                    <SvgIcon fontSize="small">
                        <SettingsIcon />
                    </SvgIcon>
                </IconButton>
            </Tooltip>
            <Popover
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                classes={{ paper: classes.popover }}
                anchorEl={ref.current}
                onClose={handleClose}
                open={isOpen}
            >
                <Typography variant="h5" color="textPrimary">
                    <Translate value="Settings" />
                </Typography>
                <Box mt={2} px={1}>
                    <FormControlLabel
                        control={<Switch />}
                        label=<Translate value="Theme_Toggle" />
                    />
                </Box>
                <Box mt={2}>
                    <TextField
                        fullWidth
                        label=<Translate value="Language" />
                        name="language"
                        onChange={handleLanguageChange}
                        select
                        SelectProps={{ native: true }}
                        value={values.locale}
                        variant="outlined"
                        color="secondary"
                    >
                        {Object.keys(supportedLocales).map((code) => (
                            <option key={code} value={code}>
                                {supportedLocales[code]}
                            </option>
                        ))}
                    </TextField>
                </Box>
                <Box mt={2}>
                    <TextField
                        fullWidth
                        label=<Translate value="Currency" />
                        name="currency"
                        onChange={handleCurrencyChange}
                        select
                        SelectProps={{ native: true }}
                        value={values.category}
                        variant="outlined"
                        color="secondary"
                    >
                        {currencies.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </TextField>
                </Box>
            </Popover>
        </>
    );
}

// Section 6: Documentation with PropTypes
Settings.propTypes = {
    locale: PropTypes.string.isRequired,
    setLocaleWithFallback: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({ locale: state.i18n.locale });
const mapDispatchToProps = { setLocaleWithFallback };

// Section 7:  Connect styles and export
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
