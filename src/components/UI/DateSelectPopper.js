import React, { useState, useRef } from "react";
import moment from "moment";
import * as Yup from "yup";
import { Formik } from "formik";
import {
    Box,
    Button,
    Popover,
    Divider,
    Grid,
    Typography,
    FormHelperText,
    makeStyles,
} from "@material-ui/core";

import TextField from "@material-ui/core/TextField";
import {
    DateRangePicker,
    DateRange,
    DateRangeDelimiter,
} from "@material-ui/pickers";

import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/moment";

import { Download as Export } from "react-feather";

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

function SelectDatePopper({ date, onCancel }) {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;

    const [selectedDate, setSelectedDate] = React.useState(
        new Date("2014-08-18T21:11:54")
    );

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    return (
        <div>
            <Button
                variant="outlined"
                color="secondary"
                onClick={handleClick}
                startIcon={<Export />}
                className={classes.export}
            >
                Report
            </Button>
            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
                classes={{ paper: classes.popover }}
                onClose={handleClose}
            >
                <Box p={2}>
                    <Typography variant="h5" color="textPrimary">
                        Settings
                    </Typography>
                    <Box mt={2}>
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
                                                        format="DD/MM/YYYY"
                                                        inputVariant="outlined"
                                                        label="Start date"
                                                        name="start"
                                                        variant="inline"
                                                        PopoverProps={{
                                                            anchorOrigin: {
                                                                vertical: "top",
                                                                horizontal:
                                                                    "left",
                                                            },
                                                            transformOrigin: {
                                                                vertical: "top",
                                                                horizontal:
                                                                    "left",
                                                            },
                                                        }}
                                                        onClick={() =>
                                                            setFieldTouched(
                                                                "end"
                                                            )
                                                        }
                                                        onChange={(date) =>
                                                            setFieldValue(
                                                                "start",
                                                                date
                                                            )
                                                        }
                                                        value={values.start}
                                                    />
                                                </Box>
                                                <Box mt={2} mb={1}>
                                                    <KeyboardDatePicker
                                                        disableToolbar
                                                        fullWidth
                                                        variant="inline"
                                                        format="DD/MM/YYYY"
                                                        inputVariant="outlined"
                                                        label="End date"
                                                        name="end"
                                                        onClick={() =>
                                                            setFieldTouched(
                                                                "end"
                                                            )
                                                        }
                                                        onChange={(date) =>
                                                            setFieldValue(
                                                                "end",
                                                                date
                                                            )
                                                        }
                                                        value={values.end}
                                                    />
                                                </Box>
                                                {Boolean(
                                                    touched.end && errors.end
                                                ) && (
                                                    <Box mt={2}>
                                                        <FormHelperText error>
                                                            {errors.end}
                                                        </FormHelperText>
                                                    </Box>
                                                )}
                                            </Box>
                                        </form>
                                    )}
                                </Formik>
                            </MuiPickersUtilsProvider>
                        </Box>
                        <Divider />
                        <Box>
                            <Box my={1} mx={1}>
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
                                >
                                    Download
                                </Button>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Popover>
        </div>
    );
}

SelectDatePopper.defaultProps = {
    date: {},
    onCancel: () => {},
};

export default SelectDatePopper;
