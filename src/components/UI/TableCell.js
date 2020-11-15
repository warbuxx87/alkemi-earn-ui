// Section 1: React low level imports

// Section 2: Material-UI imports
import TableCell from "@material-ui/core/TableCell";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
    head: {
        fontSize: 12,
        color: theme.palette.text.secondary,
        opacity: "1",
        lineHeight: "1px",
        letterSpacing: 0,
    },
    body: {
        borderBottom: "1px solid #ffffff",
    },
});

export default withStyles(styles)(TableCell);
