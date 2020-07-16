// Section 1: React/Redux low level imports
import React from "react";
import { useSelector } from "react-redux";
import { compose } from "redux";

// Section 2: internal imports
import withDrizzle from "containers/Drizzle/withDrizzle";
import CardSupply from "components/Dashboard/CardSupply";

// Section 3: Selectors / hooks
import { getTotalSupply } from "redux/selectors/totalBalance";
import { getAggregatedLendAPR } from "redux/selectors/data";
import useFetchPrice from "hooks/useFetchPrice";

// Section 4: Code Component
const CardSupplyContainer = () => {
    useFetchPrice(); // gets current USD price

    const totalSupply = useSelector(getTotalSupply); //

    const totalLendAPR = useSelector(getAggregatedLendAPR); // combined portfolio APR rate

    return (
        <CardSupply
            totalSupply={totalSupply}
            currency="USD"
            difference={0}
            apr={totalLendAPR}
        />
    );
};

// const mapStateToProps = (state) => ({
//     activeReserves: getLendActive(state),
// });

export default compose(
    withDrizzle()
    //  connect(mapStateToProps)
)(CardSupplyContainer);
