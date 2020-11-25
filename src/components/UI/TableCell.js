// Section 1: React low level imports

// Section 2: Material-UI imports
import TableCell from "@material-ui/core/TableCell";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
    head: {
        color: theme.palette.text.secondary,
        opacity: "1",
        lineHeight: "1px",
        letterSpacing: 0,
        borderBottom: "1px solid #000000",
        backgroundColor: "#09090a",
        padding: "12px 16px 10px 16px",
    },
    body: {
        borderBottom: "1px solid #000000",
    },
});

export default withStyles(styles)(TableCell);
