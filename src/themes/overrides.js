const overrides = {
    MuiDivider: {
        root: {
            backgroundColor: "#000000",
        },
    },

    MuiToolbar: {
        root: {
            disableGutters: "true",
        },
    },
    MuiInput: {
        root: {
            "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                display: "none",
            },
        },
    },
    MuiTooltip: {
        tooltip: {
            fontSize: "12px",
            color: "#fff",
            backgroundColor: "#000",
            fontWeight: 400,
        },
        arrow: {
            color: "#000",
        },
    },
    MuiButton: {
        root: {
            textTransform: "capitalize",
        },
    },

    MuiAlert: {
        root: {
            marginBottom: 32,
            marginTop: 8,
        },
        message: {
            paddingTop: 10,
            fontSize: 13,
            textTransform: "uppercase",
        },
    },

    MuiAppBar: {
        root: {
            paddingTop: 22,
            boxShadow: "none",
            paddingBottom: 30,
        },
    },
    MuiPickersCalendarHeader: {
        switchHeader: {
            // backgroundColor: lightBlue.A200,
            // color: "white",
        },
    },
    MuiPickersDay: {
        day: {
            color: "#ffffff",
        },
        daySelected: {
            backgroundColor: "#ffffff",
            color: "#000000",
        },
        current: {
            color: "#ffffff",
            backgroundColor: "#ffffff14",
            fontWeight: "600",
        },
    },
    MuiPickersModal: {
        dialogAction: {
            color: "#ffffff",
        },
    },
    MuiPickersCalendarHeader: {
        dayLabel: {
            color: "#a7a7a7",
        },
    },
    MuiPickersModal: {
        dialogAction: {
            color: "#ffffff",
        },
    },
};

export default overrides;
