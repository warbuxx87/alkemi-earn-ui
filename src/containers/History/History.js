// Imports Section 1: React/Reduxd low level imports
import React, { Component } from "react";

// Imports Section 2: internal imports ( actions, selectors etc.)
// import { fetchStatsAction } from "redux/actions/data/stats";
// import {
//     getStatsError,
//     getStats,
//     getStatsPending,
// } from "redux/selectors/data/stats";

// Imports Section 3: Internal Components Imports
import History from "components/History/History";

const history_api =
    "http://api-rinkeby.etherscan.io/api?module=account&action=tokentx&address=0xe6a53f96ceca750ef8589c5b376872213aa4f230&startblock=0&endblock=99999999&sort=desc&apikey=***REMOVED***";

// Extends History Component
class HistoryContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            txList: [],
        };
    }

    componentDidMount() {
        fetch(history_api)
            .then((res) => res.json())
            .then(
                (tx) => {
                    this.setState({
                        isLoaded: true,
                        txList: tx.result,
                    });
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error,
                    });
                }
            );
    }

    render() {
        const { error, isLoaded, txList } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <div className="history-list-wrapper">
                    <History txList={txList} error={error} pending={isLoaded} />
                </div>
            );
        }
    }
}
//
// const mapStateToProps = (state) => ({
//     error: getStatsError(state),
//     pending: getStatsPending(state),
//     txList: get_history_data(),
// });

// const mapDispatchToProps = (dispatch) =>
//     bindActionCreators(
//         {
//             fetchStats: fetchStatsAction,
//         },
//         dispatch
//     );

export default HistoryContainer;
