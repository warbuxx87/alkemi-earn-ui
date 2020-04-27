/* Main Component
// Components (or presentational components) are concerned with how things look
*/

/*
*** REQUIREMENTS ***
-- SHOULD implement some DOM markup and styles of their own
-- MAY contain both presentational components and containers
-- SHOULD allow containment via this.props.children.
-- SHOULD NOT have their own state (when they do, it MUST be UI state and MUST NOT be data)
-- SHOULD be written as functional components unless they need state, lifecycle hooks, or performance optimizations
-- MUST receive data and callbacks exclusively via props.
-- MUST NOT have dependencies with the rest of the app, such as redux actions or stores
-- MUST NOT specify how the data is loaded or mutated (API calls MUST NOT be defined in a component)
-- MUST NOT define any route
 */

//
/* ------------ BEGIN SET IMPORTS ---------- */
//

/*
*** REQUIREMENTS ***
-- MAY import components from UI libraries typically Material-UI
-- MAY import components and containers from the rest of the application
-- SHOULD NOT import any resources related to Redux, except compose() that is sometime convenient to connect multiple marterial-ui wrappers (withStyles(), withTheme()…)
-- SHOULD NOT have any dependencies in the rest of the application, except components or containers
-- MUST be organized in 3 ordered sections: 1. low-level React imports / 2. Material-UI imports / 3. intra-application imports
 */

// Section 1: React low level imports
import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { compose } from "redux";

// Section 2: Material-UI imports
import MuiComponent from "@material-ui/core/Component";
import { withStyles, withTheme } from "@material-ui/core/styles";

// Section 3: Components & Containers import from the application
import ComponentToolbar from "./Toolbar";

//
/* ------------  END SET IMPORTS ---------- */
//

//
/* ------------ BEGIN DEFINE STYLES ---------- */
//

/*
*** REQUIREMENTS ***
-- MUST be a function taking theme as argument and returning an object
*/

const styles = theme => ({
  appBar: {
    position: "fixed",
    top: 0,
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShifted: {
    marginLeft: 240,
    width: `calc(100% - ${240}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    }),
    [theme.breakpoints.down("sm")]: {
      width: "100%"
    }
  }
});
//
/* ------------ END DEFINE STYLES ---------- */
//

//
/* ------------ BEGIN CODE COMPONENT ---------- */
//

/*
*** REQUIREMENTS ***
-- SHOULD be a function taking a props object as an argument (except lifecycle, UI state or some optimization are required)
-- MUST respect compenent naming convention (see below)
-- MUST be atomic
-- MUST be agnostic of the rest of the application, this MUST include every variable namings. Think it as it should be able to exist on its own
*/

const Component = ({ classes, shifted }) => (
  <MuiComponent
    position="absolute"
    className={classNames(classes.appBar, shifted && classes.appBarShifted)}
  >
    <ComponentToolbar shifted={shifted} />
  </MuiComponent>
);

//
/* ------------ END CODE COMPONENT ---------- */
//

//
/* ------------ BEGIN DOCUMENTATION WITH PROPTYPES ---------- */
//

/*
*** REQUIREMENTS ***
-- MUST be documented with PropTypes */

Component.propTypes = {
  classes: PropTypes.object.isRequired,
  shifted: PropTypes.bool
};

//
/* ------------ END DOCUMENTATION WITH PROPTYPES  ---------- */
//

//
/* ------------ BEGIN CONNECT STYLES & EXPORT ---------- */
//

/*
*** REQUIREMENTS ***
-- MAY inject styles information using withStyle(), withTheme(), withWidth()
-- There MUST be one unique export
*/

// Basic Export
// export default withStyles(styles)(Component);

// Advanced Export w/ Redux
export default compose(withTheme(), withStyles(styles))(Component);

//
/* ------------ END CONNECT STYLES & EXPORT ---------- */
//
