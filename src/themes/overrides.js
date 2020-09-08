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
    MuiButton: {
        root: {
            textTransform: "capitalize",
        },
    },

    MuiAlert: {
        root: {
            marginBottom: 48,
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
