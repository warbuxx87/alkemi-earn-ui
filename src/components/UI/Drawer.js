import { makeStyles, createStyles } from "@material-ui/core/styles";

const Drawer = makeStyles((theme) =>
    createStyles({
        MuiTableHeadroot: {
            backgroundColor: "#ffffff",
        },
        chart: {
            maxHeight: 150,
        },
        borderChart: {
            padding: 0,
        },
        supplyChart: {
            backgroundColor: "#1B1B1B",
        },
        supplyPercent: {
            letterSpacing: "0px",
            color: "#00A577",
            opacity: 1,
            fontSize: "28px",
            fontWeight: "500",
            textAlign: "center",
            // backgroundColor:'#1B1B1B',
            padding: "25px 0",
        },
        simpleModalChart: {
            // backgroundColor:'#1B1B1B',
            paddingBottom: "30px",
        },

        chartBox: {
            backgroundColor: "#000000",
        },
        drawer: {
            width: "100%",
            "@media (min-width: 780px)": {
                width: 380,
            },
        },

        buttonWrap: {
            // width: 90px;
            // width: '100%',
            marginTop: "30px",
            textAlign: "center",
            // backgroundColor:'#00A793',
            // height: '55px',
            marginBottom: "23px",
            // paddingTop:'10px'
        },
        btnDrawer: {
            minWidth: 100,
            textTransform: "capitalize",
            fontWeight: 500,
            minHeight: 32,
        },

        sendButtonDiv: {
            paddingTop: "40px",
            paddingBottom: "30px",
        },

        inputWrap: {
            position: "relative",
        },
        antInput: {
            backgroundColor: "#161719 !important",
            border: "1px solid #000000",
            height: "40px",
        },
        maxTips: {
            position: "absolute",
            right: "15px",
            top: "17px",
            cursor: "pointer",
            color: "#ffffff",
            fontSize: "14px",
        },
        input: {
            background: "#1B1B1B 0% 0% no-repeat padding-box",
            border: "1px solid #000000",
            opacity: 1,
            height: "54px",
            paddingLeft: "10px",
            color: "white",
            fontSize: "18px",
        },
        amount: {
            color: "white",
            paddingBottom: "10px",
        },
        rateInfo: {
            color: "white",
            fontSize: "14px",
            marginTop: "20px",
        },
        rateRow: {
            padding: "12px 0",
            borderBottom: "1px dashed #a7a7a7",
        },
        closeIcon: {
            paddingRight: "10px",
            cursor: "pointer",
        },
        textSupply: {
            paddingLeft: "40px",
        },

        walletBalance: {
            color: "#a7a7a7",
        },
    })
);
export default Drawer;
