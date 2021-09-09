// Section 1: React low level imports

// Section 2: Material-UI imports
import TableCell from "@material-ui/core/TableCell";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
    root: {
        borderBottom: "1px solid #fff444",
    },
    head: {
        color: theme.palette.text.secondary,
        opacity: "1",
        lineHeight: "1px",
        letterSpacing: 0,
        borderBottom: "none",
        backgroundColor: "#1a1d21",
        padding: "12px 16px 10px 16px",
        borderTop: "none",
    },
    body: {
        borderBottom: "none",
    },
});

export default withStyles(styles)(TableCell);
