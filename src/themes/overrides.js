const overrides = {
    MuiDivider: {
        root: {
            backgroundColor: "#000000"
        }
    },

    MuiToolbar: {
        root: {
            disableGutters: "true"
        }
    },

    MuiButton: {
        root: {
            textTransform: "capitalize"
        }
    },
    MuiAlert: {
     message: {
     paddingTop: 10,
     fontSize: 13,
     textTransform: "capitalize",
   }
 },
    MuiAppBar: {
        root: {
            paddingTop: 22,
            boxShadow: "none",
            paddingBottom: 30
        }
    }
};

export default overrides;
