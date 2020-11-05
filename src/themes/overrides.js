const overrides = {
    MuiDivider: {
        root: {
            backgroundColor: "#000000",
        },
    },

    MuiTab: {
        root: {
            padding: "6px 20px 6px 0px",
            marginRight: 20,
            "@media (min-width: 600px)": {
                minWidth: "60px",
            },
        },
        wrapper: {
            alignItems: "flex-start",
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
};

export default overrides;
