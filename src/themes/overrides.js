const overrides = {
    MuiTab: {
        root: {
            marginLeft: "16px !important",
            marginRight: "16px !important",
            minWidth: "fit-content !important",
            paddingLeft: "0px !important",
            paddingRight: "0px !important",
            "&:first-of-type": {
                marginLeft: "0px !important",
            },
        },
    },
    MuiDivider: {
        root: {
            backgroundColor: "#0e0e0e",
        },
    },

    MuiToolbar: {
        root: {
            disableGutters: "true",
        },
    },
    MuiInput: {
        root: {
            "& input::-webkit-clear-button, & input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button":
                {
                    display: "none",
                },
        },
    },
    MuiTooltip: {
        tooltip: {
            fontSize: "11px",
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
};

export default overrides;
