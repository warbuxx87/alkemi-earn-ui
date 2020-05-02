import React from "react";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  makeStyles
} from "@material-ui/core";
import Label from "components/UI/Label";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3),
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between"
  },
  label: {
    marginLeft: theme.spacing(1)
  },
  item: {
    textAlign: "center",
    justifyContent: "center"
  }
}));

function TotalApr({ className, ...rest }) {
  const classes = useStyles();
  const data = {
    value: (0.0).toFixed(2),
    percentage: "%",
    difference: 10
  };

  return (
    <Card>
      <CardHeader title="Avgerage Interest APR" className={classes.item} />
      <Divider />
      <CardContent>
        <Box
          className={classes.item}
          mt={2}
          mb={1}
          display="flex"
          alignItems="center"
          flexWrap="wrap"
        >
          <Typography variant="h3" color="textPrimary">
            {data.value}
            {data.percentage}
          </Typography>
          <Label
            className={classes.label}
            color={data.difference > 0 ? "success" : "error"}
          >
            {data.difference > 0 ? "+" : ""}
            {data.difference}%
          </Label>
        </Box>
      </CardContent>
    </Card>
  );
}

TotalApr.propTypes = {
  className: PropTypes.string
};

export default TotalApr;
