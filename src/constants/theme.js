import { createMuiTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Grid from "@material-ui/core/Grid";
import ListItemText from "@material-ui/core/ListItemText";
import red from "@material-ui/core//colors/red";

const drawerWidth = 339;

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#4785a5"
        },
        secondary: {
            main: "#9575cd"
        },
        error: red
    },
    root: {
        margin: "10px 10px 10px 10px",
        display: "flex"
    },
    appBar: {
        width: `calc(100% - 400px)`,
        marginLeft: "375px",
        // backgroundColor:'white',
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
