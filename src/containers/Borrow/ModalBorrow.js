// Section 1: React/Redux low level imports
import React, { useContext } from "react";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";

// Section 2: internal imports
import BorrowModal from "components/Borrow/ModalBorrow";
import DrizzleContext from "utils/DrizzleContext";
import onBorrowAction from "./BorrowAction";

const BorrowModalContainer = ({ asset, onBorrowAction }) => {
    const { drizzle } = useContext(DrizzleContext);

    return (
        <BorrowModal
            asset={asset}
            onBorrow={({ asset, amount }) =>
                onBorrowAction({ drizzle, asset, amount })
            }
        />
    );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators({ onBorrowAction }, dispatch);

export default compose(connect(mapStateToProps, mapDispatchToProps))(
    BorrowModalContainer
);
