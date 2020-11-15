const overrides = {
    MuiDivider: {
        root: {
            backgroundColor: "#e3ebf6",
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
    MuiPaper: {
        elevation1: {
            boxShadow:
                "0px 2px 4px 0px rgba(0,0,0,.04), 0px 1px 2px 0 rgba(15,89,209,.08)",
        },
    },
    MuiAppBar: {
        root: {
            paddingTop: 22,
            boxShadow: "none",
            paddingBottom: 30,
        },
    },
    MuiTableRow: {
        root: {
            boxShadow:
                "0px 2px 4px 0px rgba(0,0,0,.04), 0px 1px 2px 0 rgba(15,89,209,.08)",
            borderRadius: "4px",
        },
    },
};

export default overrides;
