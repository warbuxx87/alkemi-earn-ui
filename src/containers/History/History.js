// Imports Section 1: React/Reduxd low level imports
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Imports Section 2: internal imports ( actions, selectors etc.)
import { fetchStatsAction } from "redux/actions/data/stats";
import {
    getStatsError,
    getStats,
    getStatsPending,
} from "redux/selectors/data/stats";

// Imports Section 3: Internal Components Imports
import History from "components/History/History";

// Extends History Component
class withHistory extends Component {
    render() {
        // return a presentational component
        const { tx, error, pending, fetchStats } = this.props;

        return (
            <div className="history-list-wrapper">
                <History
                    tx={tx}
                    error={error}
                    pending={pending}
                    fethStats={fetchStats}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    error: getStatsError(state),
    tx: getStats(state),
    pending: getStatsPending(state),
});

const mapDispatchToProps = (dispatch) =>
    bindActionCreators(
        {
            fetchStats: fetchStatsAction,
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(withHistory);
