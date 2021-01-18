import React, { useState, useRef } from "react";
import moment from "moment";
import * as Yup from "yup";
import { Formik } from "formik";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    Grid,
    Typography,
    makeStyles,
    TextField,
    IconButton,
    FormControlLabel,
    FormHelperText,
    SvgIcon,
} from "@material-ui/core";

import { Download as Export } from "react-feather";
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/moment";

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
    confirmButton: {
        marginLeft: theme.spacing(2),
    },
}));

function SelectDateForm({ date, onCancel }) {
    const classes = useStyles();

    const ref = useRef(null);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button
                variant="outlined"
                color="secondary"
                onClick={handleClickOpen}
                startIcon={<Export />}
                className={classes.export}
            >
                Report
            </Button>
            <Dialog
                onClose={handleClose}
                aria-labelledby="gnosis-notification"
                open={open}
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
                                                format="DD/MM/YYYY"
                                                inputVariant="outlined"
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
                                </form>
                            )}
                        </Formik>
                    </MuiPickersUtilsProvider>
                </Box>
                <Divider />
                <DialogActions>
                    <Box my={1} mx={1}>
                        <Button size="small" autoFocus onClick={handleClose}>
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
                </DialogActions>
            </Dialog>
        </div>
    );
}

SelectDateForm.defaultProps = {
    date: {},
    onCancel: () => {},
};

export default SelectDateForm;
