// Imports Section 1: React/Reduxd low level imports
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

// Imports Section 2: internal imports ( actions, selectors etc.)
import fetchStatsAction from "./Fetch";
// import { getStatsError, getStats, getStatsPending } from "redux/selectors/data";

// Imports Section 3: Internal Components Imports
import History from "components/History/History";
import NoWhere from "components/NoWhere/NoWhere";

// Extends Stats Component
class HistoryContainer extends Component {
    constructor(props) {
        super(props);

        this.shouldComponentRender = this.shouldComponentRender.bind(this);
    }

    componentWillMount() {
        const { fetchStats } = this.props;
        fetchStats();
    }

    shouldComponentRender() {
        const { pending } = this.props;
        if (this.pending === false) return false;
        // more tests
        return true;
    }

    render() {
        const { tx, error, pending } = this.props;

        if (!this.shouldComponentRender()) return <NoWhere />;

        return (
            <div className="history-list-wrapper">
                <History tx={tx} error={error} pending={pending} />
            </div>
        );
    }
}

// const mapStateToProps = state => ({
//   error: getStatsError(state),
//   tx: getStats(state),
//   pending: getStatsPending(state)
// });

const mapStateToProps = (state, ownProps) => ({
    tx: state.data.stats.tx
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        {
            fetchStats: fetchStatsAction
        },
        dispatch
    );

export default connect(mapStateToProps, mapDispatchToProps)(HistoryContainer);
