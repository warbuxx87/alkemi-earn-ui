import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  // @dev use https://in-your-saas.github.io/material-ui-theme-editor/
  palette: {
    common: { "black": "#000", "white": "rgba(255, 255, 255, 1)" },
    background: {
      paper: "rgba(32, 33, 35, 1)",
      default: "rgba(0, 0, 0, 1)"
    },
    primary: {
      light: "rgba(51, 183, 146, 1)",
      main: "rgba(0, 165, 119, 1)",
      dark: "rgba(0, 115, 83, 1)",
      contrastText: "#fff"
    },
    secondary: {
      light: "rgba(170, 144, 215, 1)",
      main: "rgba(149, 117, 205, 1)",
      dark: "rgba(104, 81, 143, 1)",
      contrastText: "#fff"
    },
    error: {
      light: "#e57373",
      main: "rgba(208, 2, 27, 1)",
      dark: "#d32f2f",
      contrastText: "#fff"
    },
    text: {
      primary: "rgba(255, 255, 255, 1)",
      secondary: "rgba(155, 155, 155, 1)",
      disabled: "rgba(255, 255, 255, 1)",
      hint: "rgba(184, 233, 134, 1)"
    }
  },
    root: {
        margin: "10px 10px 10px 10px",
        display: "flex"
    },
    appBar: {
        width: `calc(100% - 400px)`,
        marginLeft: "375px",
        boxShadow: "none",
        backgroundColor: "#000000",
        paddingTop: "22px"
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0
    },
    drawerPaper: {
        width: drawerWidth,
        margin: "22px 0px 0px 35px",
        background: "#202123",
        color: "white"
    },

    // necessary for content to be below app bar
    toolbar: {
        padding: "24px 19px"
    },
    image: {
        width: "163px",
        height: "27px"
    },
    divider: {
        backgroundColor: "#000000"
    },
    menuList: {
        padding: "12px 0 0 0px"
    },
    menuItem: {
        backgroundColor: "#000000",
        borderLeft: "3px solid #FFFFFF",
        opacity: 1
    },
    menuItemText: {
        paddingLeft: "24px",
        textTransform: "capitalize",
        opacity: 1,
        //font: Regular 16px/21px Roboto;
        fontFamily: "Regular,Roboto",
        fontSize: "10px"
    },
    wallet: {
        display: "flex",
        justifyContent: "flex-end",
        paddingLeft: "65px"
    },
    status: {
        background: "green",
        width: "9px",
        height: "9px",
        borderRadius: "5px",
        marginTop: "7px",
        marginRight: "5px"
    },
    number: {
        textAlign: "right",
        width: "160px"
    },
    unit: {
        width: "100px"
    },
    overview: {
        letterSpacing: 0,
        color: "#6F7278",
        opacity: 1,
        fontSize: "14px"
    },
    current: {
        color: "#FFFFFF",
        fontSize: "26px",
        fontWeight: "bolder"
    },
    headerLeft: {
        paddingTop: "10px"
    },
    borderNoti: {
        display: "flex",
        width: "168px",
        height: "36px",
        justifyContent: "center",
        border: "1px solid #FFFFFF",
        borderRadius: "100px",
        opacity: "1",
        marginTop: "25px"
    },
    price: {
        paddingTop: "7px"
    },
    statusBadge: {
        background: "green",
        width: "9px",
        height: "9px",
        borderRadius: "5px",
        marginTop: "12px",
        marginRight: "5px"
    },
    notification: {
        display: "flex",
        justifyContent: "flex-end",
        paddingRight: "5px"
    },
    content: {
        marginTop: "100px",
        marginLeft: "50px",
        flexGrow: 1
        //  padding: theme.spacing(3)
    }
});

export default theme;
