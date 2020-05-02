// Main Container

// Section 1: React/Reduxd low level imports
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Section 2: internal imports
import onBorrowActivate from "./Activate";
import Borrow from "components/Borrow/Borrow";

// Section 3: Selectors
import {
  getBorrowActive,
  getBorrowInactive
  // getBorrowError,
  // getBorrowPending
} from "redux/selectors/data";

class BorrowContainer extends Component {
  render() {
    // return a presentational component
    const { inactiveBorrow, activeBorrow, onActivate } = this.props;
    return (
      <Borrow
        inactiveBorrow={inactiveBorrow}
        activeBorrow={activeBorrow}
        onActivate={onActivate}
      />
    );
  }
}

const mapStateToProps = state => ({
  inactiveBorrow: getBorrowInactive(state),
  activeBorrow: getBorrowActive(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ onActivate: onBorrowActivate }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BorrowContainer);
