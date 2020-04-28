import React from "react";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import BorrowingTable from "./Table";
// TODO: temporary use Lend Active Table here, will replace on borrow feature
import LendTableActive from "components/Lend/TableActive";
import styles from "./styles";

export default function Borrow({ inactiveBorrow, activeLend, onActivate }) {
    const classes = styles();
    return (
        <div className={classes.borrowing}>
            <Grid container spacing={3}>
                <Grid className={classes.box} item xs>
                    <Grid className={classes.info_box}>
                        <Grid className={classes.title}>
                            Aggregated USD Value
                        </Grid>
                        <Divider className={classes.divider} />
                        <Grid className={classes.valuable}>$0.00</Grid>
                    </Grid>
                </Grid>
                <Grid className={classes.box} item xs>
                    <Grid className={classes.info_box}>
                        <Grid className={classes.title}>Interest Paid</Grid>
                        <Divider className={classes.divider} />
                        <Grid className={classes.valuable}>$0.00</Grid>
                    </Grid>
                </Grid>
                <Grid className={classes.box} item xs>
                    <Grid className={classes.info_box}>
                        <Grid className={classes.title}>
                            Average Interest APR
                        </Grid>
                        <Divider className={classes.divider} />
                        <Grid className={classes.valuable}>0.00%</Grid>
                    </Grid>
                </Grid>
            </Grid>
            {!!activeLend.length && <LendTableActive data={activeLend} />}
            {!!inactiveBorrow.length && (
                <BorrowingTable
                    inactiveBorrow={inactiveBorrow}
                    onActivate={onActivate}
                />
            )}
        </div>
    );
}
