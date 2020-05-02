// sub component

// Section 1: React low level imports

// Section 2: Material-UI imports
import TableCell from "@material-ui/core/TableCell";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  head: {
    backgroundColor: "#202123",
    color: "#a7a7a7",
    opacity: "1",
    fontSize: "12px",
    lineHeight: "1px",
    letterSpacing: 0,
    borderBottom: "1px solid #000000"
  },
  body: {
    fontSize: 14,
    color: theme.palette.common.white,
    borderBottom: "1px solid #000000"
  }
});

export default withStyles(styles)(TableCell);
