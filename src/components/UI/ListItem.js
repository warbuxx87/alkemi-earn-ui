import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import { withStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const styles = theme => ({
  item: {
    paddingLeft: 23,
    paddingRight: 23
  },
  selected: {
    borderLeftStyle: "solid",
    borderWidth: 4,
    borderColor: theme.palette.common.white,
    backgroundColor: theme.palette.common.darkGrey
  }
});

const ListItem1 = ({ classes, icon, text, onClick, selected, ...props }) => (
  <ListItem
    button
    onClick={onClick}
    {...props}
    className={clsx(classes.item, { [classes.selected]: selected })}
  >
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={text} />
  </ListItem>
);

ListItem1.propTypes = {
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
  onClick: PropTypes.func.isRequired
};

export default withStyles(styles)(ListItem1);
