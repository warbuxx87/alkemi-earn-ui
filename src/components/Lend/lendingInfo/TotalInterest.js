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

function TotalInterest({ className, ...rest }) {
  const classes = useStyles();
  const data = {
    value: "0.00",
    currency: "$",
    difference: 0
  };

  return (
    <Card>
      <CardHeader title="Interest Earned" className={classes.item} />
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
            {data.currency}
            {data.value}
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

TotalInterest.propTypes = {
  className: PropTypes.string
};

export default TotalInterest;
