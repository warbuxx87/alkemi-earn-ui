// Section 1: React/Redux low level imports
import React from "react";
import { useSelector } from "react-redux";
import { compose } from "redux";

// Section 2: internal imports
import withDrizzle from "containers/Drizzle/withDrizzle";
import CardDeposit from "components/Markets/CardSupply";

// Section 3: Selectors / hooks
import { getTotalDeposit } from "redux/selectors/totalBalance";
import { getAggregatedDepositAPR } from "redux/selectors/data/lend";
import useFetchPrice from "hooks/useFetchPrice";

// Section 4: Code Component
const CardDepositContainer = () => {
    useFetchPrice(); // gets current USD price

    const totalDeposit = useSelector(getTotalDeposit); //

    const totalDepositAPR = useSelector(getAggregatedDepositAPR); // combined portfolio APR rate

    return (
        <CardDeposit
            totalDeposit={totalDeposit}
            currency="USD"
            difference={0}
            apr={totalDepositAPR}
        />
    );
};

// const mapStateToProps = (state) => ({
//     activeReserves: getLendActive(state),
// });

export default compose(
    withDrizzle()
    //  connect(mapStateToProps)
)(CardDepositContainer);
