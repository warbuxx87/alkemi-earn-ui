const overrides = {
    MuiDivider: {
        root: {
            backgroundColor: "rgba(255, 255, 255, 0.10)",
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
            color: "#000",
            backgroundColor: "#fff",
            fontWeight: 400,
        },
        arrow: {
            color: "#fff",
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
    MuiPickersCalendarHeader: {
        dayLabel: {
            color: "#a7a7a7",
        },
    },
    MuiBackdrop: {
        root: {
            backgroundColor: "rgba(0, 1, 5, 0.5)",
        },
    },
};

export default overrides;
