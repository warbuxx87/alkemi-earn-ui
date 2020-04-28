// Main Container

// Section 1: React/Reduxd low level imports
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// Section 2: internal imports
import onBorrowActivate from "redux/actions/borrow-action";
import Borrow from "components/Borrow";

// Section 3: Selectors
import {
  getBorrowActive,
  getBorrowInactive,
  // getLendError,
  // getLendPending
} from "redux/selectors/data";

class BorrowContainer extends Component {

  render() {
    // return a presentational component
    const {
      inactiveBorrow,
      activeLend,
      onActivate
    } = this.props;
    return (
      <Borrow
        inactiveBorrow={inactiveBorrow}
        activeLend={activeLend}
        onActivate={onActivate}
      />
    );
  }
}

const mapStateToProps = state => ({
  inactiveBorrow: getBorrowInactive(state),
  activeLend: getBorrowActive(state)
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ onActivate: onBorrowActivate }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(BorrowContainer);
