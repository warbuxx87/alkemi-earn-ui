// Section 1: React low level imports
import React from "react";
import moment from "moment";
import * as Yup from "yup";
import { Formik } from "formik";
import DateFnsUtils from "@date-io/moment";

// Section 2: Material-UI imports
import {
    Box,
    Button,
    Popover,
    Divider,
    Typography,
    FormHelperText,
    makeStyles,
} from "@material-ui/core";

import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";

// Section 3: Components & Containers import from the application
import { Download as Export } from "react-feather";

// Section 4: Define Styles function taking theme as argument and returning an object
const useStyles = makeStyles((theme) => ({
    content: {
        color: "#e0e0e0",
        paddingTop: 16,
        paddingBottom: 12,
    },
    image: {
        maxWidth: "28px",
        marginRight: "12px",
    },
    header: {
        fontSize: "1rem",
        display: "flex",
        alignItems: "center",
        fontWeight: "500",
    },
    export: {
        height: "38px",
        marginLeft: "16px",
        "& .MuiButton-startIcon": {
            width: "18px",
        },
    },
}));

function SelectDatePopper({
    date,
    walletConnected,
    currentNetworkName,
    onCancel,
}) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);

    // Section 5: Code Component
    return (
        <div>
            <Button
                variant="outlined"
                color="secondary"
                onClick={handleClick}
                startIcon={<Export />}
                className={classes.export}
                disabled={!walletConnected}
            >
                Report
            </Button>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                classes={{ paper: classes.popover }}
            >
                <Box m={2}>
                    <Typography variant="h5" color="textPrimary">
                        Download Report
                    </Typography>
                </Box>
                <Divider />
                <Box m={2}>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Formik
                            initialValues={{
                                end: date.end || moment(),
                                start: date.start || moment(),
                            }}
                            validationSchema={Yup.object().shape({
                                end: Yup.date().when(
                                    "start",
                                    (start, schema) =>
                                        start &&
                                        schema.min(
                                            start,
                                            "End date must be later than start date"
                                        )
                                ),
                            })}
                            onSubmit={(values /*, actions*/) => {
                                // Should be refactored out to a parent container (this part to history.js container) in case the date select popper in case this component is reused
                                const startTimestamp = moment
                                    .utc(values.start)
                                    .startOf("day")
                                    .unix(); // start of the the day
                                const endTimestamp = moment
                                    .utc(values.end)
                                    .endOf("day")
                                    .unix(); // last second of the the day

                                const link = `https://${currentNetworkName}.api.alkemi.network/reports/0xb7bfbc2cf0167eb2945247c18dd7caa28d9c39f0?timestamp[$gte]=${startTimestamp}&timestamp[$lte]=${endTimestamp}`;

                                window.open(link, "_blank");
                            }}
                        >
                            {({
                                errors,
                                handleBlur,
                                handleChange,
                                handleSubmit,
                                setFieldTouched,
                                setFieldValue,
                                touched,
                                values,
                            }) => (
                                <form onSubmit={handleSubmit}>
                                    <Box>
                                        <Typography
                                            align="center"
                                            gutterBottom
                                            variant="h3"
                                            color="textPrimary"
                                        ></Typography>
                                        <Box mt={2}>
                                            <KeyboardDatePicker
                                                disableToolbar
                                                fullWidth
                                                autoOk
                                                variant="inline"
                                                format="DD/MM/YYYY"
                                                inputVariant="outlined"
                                                label="Start date"
                                                name="start"
                                                onClick={() =>
                                                    setFieldTouched("end")
                                                }
                                                onChange={(date) =>
                                                    setFieldValue("start", date)
                                                }
                                                value={values.start}
                                            />
                                        </Box>
                                        <Box mt={2} mb={1}>
                                            <KeyboardDatePicker
                                                disableToolbar
                                                fullWidth
                                                autoOk
                                                format="DD/MM/YYYY"
                                                inputVariant="outlined"
                                                variant="inline"
                                                label="End date"
                                                name="end"
                                                onClick={() =>
                                                    setFieldTouched("end")
                                                }
                                                onChange={(date) =>
                                                    setFieldValue("end", date)
                                                }
                                                value={values.end}
                                            />
                                        </Box>
                                        {Boolean(touched.end && errors.end) && (
                                            <Box mt={2}>
                                                <FormHelperText error>
                                                    {errors.end}
                                                </FormHelperText>
                                            </Box>
                                        )}
                                    </Box>

                                    <Divider />
                                    <Box
                                        p={2}
                                        display="flex"
                                        justifyContent="flex-end"
                                    >
                                        <Button
                                            size="small"
                                            autoFocus
                                            onClick={handleClose}
                                        >
                                            Close
                                        </Button>
                                        <Button
                                            variant="contained"
                                            type="submit"
                                            color="secondary"
                                            className={classes.confirmButton}
                                            size="small"
                                            disabled={
                                                Object.keys(errors).length !==
                                                0 /* Not really a good way to implement this, TODO: set a template on how to manage formik forms, and use Yup here too (as a callback perhaps) */
                                            }
                                        >
                                            Download
                                        </Button>
                                    </Box>
                                </form>
                            )}
                        </Formik>
                    </MuiPickersUtilsProvider>
                </Box>
            </Popover>
        </div>
    );
}

// Section 6: Documentation with PropTypes
SelectDatePopper.defaultProps = {
    date: {},
    onCancel: () => {},
};

// Section 7:  Connect styles and export
export default SelectDatePopper;
