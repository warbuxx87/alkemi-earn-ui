import { readyToTransact } from "containers/AppBar/onboard";
import { toWei } from "utils/front-end";
import address from "constants/address_map.json";
import constants from "constants/constant.json";
import { notifyTransaction } from "containers/AppBar/notify";
import { initAssetContract } from "utils/contracts";

export const handle_approve = async ({ drizzle, asset, myAccount }) => {
    if (!(await readyToTransact())) throw new Error("not ready to transaction");
    const web3 = drizzle.web3;
    const drizzleStore = drizzle.store.getState();
    const network = constants.network_type[drizzleStore.web3.networkId];
    const address_MoneyMarket = address[network].address_MoneyMarket;
    const tokenContract = initAssetContract({ drizzle, asset });
    const balance = Object.values(drizzleStore.accountBalances)[0];
    return await {
        estimateGas: () =>
            tokenContract.methods
                .approve(address[network].address_MoneyMarket, -1)
                .estimateGas({ from: myAccount })
                .then((result) => result.toString()),
        gasPrice: web3.eth.getGasPrice,
        balance,
        network,
        sendTransaction: () =>
            tokenContract.methods.approve.cacheSend(address_MoneyMarket, -1, {
                from: myAccount,
            }),
    };
};

export const handle_faucet_allocateTo = async ({ drizzle, asset, amount }) => {
    console.log(asset.unit);
    if (!(await readyToTransact())) throw new Error("not ready to transaction");
    const web3 = drizzle.web3;
    const drizzleStore = drizzle.store.getState();
    const network = constants.network_type[drizzleStore.web3.networkId];
    const myAccount = drizzleStore.accounts[0];
    const unit = asset.unit;
    const tokenContract = drizzle.contracts[unit];
    const weiAmount = toWei(amount, unit);
    const balance = Object.values(drizzleStore.accountBalances)[0];
    const sendAllocate = tokenContract.methods.allocateTo.cacheSend(
        myAccount,
        weiAmount,
        {
            from: myAccount,
        }
    );
    return sendAllocate;
};

export const handle_supply_click = async ({ drizzle, amount, asset }) => {
    if (!(await readyToTransact())) throw new Error("not ready to transact");
    const web3 = drizzle.web3;
    const drizzleStore = drizzle.store.getState();
    const myAccount = drizzleStore.accounts[0];
    const network = constants.network_type[drizzleStore.web3.networkId];
    const MoneyMarketContract = drizzle.contracts.MoneyMarket;
    const token_address = address[network][`address_${asset.unit}`];
    const unit = asset.unit;
    const weiAmount = toWei(amount, unit);
    const balance = Object.values(drizzleStore.accountBalances)[0];
    const sendSupply = MoneyMarketContract.methods.supply.cacheSend(
        token_address,
        weiAmount,
        {
            from: myAccount,
        }
    );
    return sendSupply;
};

export const get_available_to_borrow = (
    mContract,
    tokenContract,
    m_address,
    token_address,
    account,
    collateral_rate,
    originationFee,
    that
) => {
    // console.log('***** get_available_to_borrow ****');

    mContract.methods
        .calculateAccountValues(account)
        .call((err, res_account_values) => {
            var max_borrow = that
                .bn(res_account_values[1])
                .mul(that.bn(10 ** 18))
                .div(that.bn(collateral_rate));
            var max_borrow_safe = max_borrow
                .mul(that.bn("8"))
                .div(that.bn("10"));

            if (max_borrow.lte(that.bn(res_account_values[2]))) {
                that.setState({
                    available_to_borrow: 0,
                    available_to_borrow_safe: 0,
                });
                return false;
            }

            mContract.methods
                .assetPrices(token_address)
                .call((err, res_price) => {
                    // console.log('res_cash: ', res_cash);
                    // console.log('res_price: ', res_price);
                    tokenContract.methods
                        .balanceOf(m_address)
                        .call((err, res_cash) => {
                            var t_liquidity = max_borrow.sub(
                                that.bn(res_account_values[2])
                            );
                            var liquidity_bn = that
                                .bn(t_liquidity)
                                .mul(that.bn("10").pow(that.bn("18")))
                                .div(
                                    that
                                        .bn(res_price)
                                        .mul(
                                            that
                                                .bn("10")
                                                .pow(that.bn("18"))
                                                .add(that.bn(originationFee))
                                        )
                                );
                            var to_borrow_bn = liquidity_bn.lt(
                                that.bn(res_cash)
                            )
                                ? liquidity_bn
                                : that.bn(res_cash);

                            if (
                                max_borrow_safe.lte(
                                    that.bn(res_account_values[2])
                                )
                            ) {
                                that.setState({
                                    available_to_borrow: to_borrow_bn.toString(),
                                    available_to_borrow_safe: 0,
                                });
                                return false;
                            }
                            var t_liquidity_safe = max_borrow_safe.sub(
                                that.bn(res_account_values[2])
                            );
                            var liquidity_bn_safe = that
                                .bn(t_liquidity_safe)
                                .mul(that.bn("10").pow(that.bn("18")))
                                .div(
                                    that
                                        .bn(res_price)
                                        .mul(
                                            that
                                                .bn("10")
                                                .pow(that.bn("18"))
                                                .add(that.bn(originationFee))
                                        )
                                );
                            var to_borrow_bn_safe = liquidity_bn_safe.lt(
                                that.bn(res_cash)
                            )
                                ? liquidity_bn_safe
                                : that.bn(res_cash);

                            // console.log('available_to_borrow: ', to_borrow_bn.toString());
                            // console.log('available_to_borrow_safe: ', to_borrow_bn_safe.toString());
                            that.setState({
                                available_to_borrow: to_borrow_bn.toString(),
                                available_to_borrow_safe: to_borrow_bn_safe.toString(),
                            });
                        });
                });
        });
};

export const handle_borrow_click = async ({ drizzle, amount, asset }) => {
    if (!(await readyToTransact())) throw new Error("not ready to transact");
    const web3 = drizzle.web3;
    const drizzleStore = drizzle.store.getState();
    const myAccount = drizzleStore.accounts[0];
    const network = constants.network_type[drizzleStore.web3.networkId];
    const MoneyMarketContract = drizzle.contracts.MoneyMarket;
    const token_address = address[network][`address_${asset.unit}`];
    const weiAmount = toWei(amount, asset.unit);
    const balance = Object.values(drizzleStore.accountBalances)[0];
    const result = await notifyTransaction({
        estimateGas: () =>
            MoneyMarketContract.methods
                .borrow(token_address, weiAmount)
                .estimateGas({ from: myAccount })
                .then((result) => result.toString()),
        gasPrice: web3.eth.getGasPrice,
        balance,
        network,
        sendTransaction: () =>
            new Promise((resolve, reject) =>
                MoneyMarketContract.methods
                    .borrow(token_address, weiAmount)
                    .send({ from: myAccount }, (error, hash) =>
                        error ? reject(error) : resolve(hash)
                    )
            ),
        events: {
            txRequest: {
                message: "Please confirm your transaction",
            },
            txPool: {
                message: `Borrowing ${amount} ${asset.unit} from the pool`,
            },
            txConfirmed: {
                message: `You successfully borrowed ${amount} ${asset.unit} from the pool.`,
            },
        },
    });
    return result;
};

export const handle_borrow_max = (that, balance, decimals) => {
    var to_show;
    balance = balance.toString();
    if (balance.length <= decimals) {
        to_show = (
            "0." + ("000000000000000000" + balance).substr(-decimals)
        ).substring(0, 18);
    } else {
        to_show = (
            that.bn(balance).div(that.bn(10 ** decimals)) +
            "." +
            balance.substr(-decimals)
        ).substring(0, 18);
    }

    that.setState({
        borrow_amount: to_show,
        i_will_borrow_max: true,
        borrow_exceed: false,
    });

    if (that.bn(balance).toString() === that.bn("0").toString()) {
        that.setState({ is_borrow_enable: false });
    } else {
        that.setState({ is_borrow_enable: true });
    }
};

export const handle_borrow_change = (value, that, decimals, balance) => {
    if (value.length > 18) {
        return;
    }

    that.setState({ i_will_borrow_max: false, borrow_exceed: false });

    if (value === null || value === "") {
        console.log("value === null || value === ''");
        that.setState({
            is_borrow_enable: true,
            borrow_amount: null,
            borrow_exceed: false,
            no_such_borrow_balance: false,
        });
        return false;
    } else {
        var amount_bn, sub_num;
        var temp_value = value;
        if (temp_value.indexOf(".") > 0) {
            sub_num = temp_value.length - temp_value.indexOf(".") - 1; // 3
            if (sub_num > decimals) {
                console.log(" --- decimals extent ---");
                that.setState({
                    borrow_amount: value,
                    is_borrow_enable: false,
                });
                return false;
            }
            temp_value =
                temp_value.substr(0, temp_value.indexOf(".")) +
                temp_value.substr(value.indexOf(".") + 1); // '123456'
            amount_bn = that
                .bn(temp_value)
                .mul(that.bn(10 ** (decimals - sub_num))); // bn_'123456'
        } else {
            amount_bn = that.bn(value).mul(that.bn(10 ** decimals));
        }

        console.log(amount_bn.toString());

        if (amount_bn.gt(that.bn(balance))) {
            console.log(" --- INSUFFICIENT BALANCE ---");
            that.setState({
                borrow_amount: value,
                is_borrow_enable: false,
                borrow_exceed: false,
                no_such_borrow_balance: true,
            });
            return false;
        } else {
            that.setState({
                borrow_amount: value,
                is_borrow_enable: true,
                no_such_borrow_balance: false,
            });
        }

        if (amount_bn.gt(that.bn(that.state.available_to_borrow_safe))) {
            that.setState({ borrow_exceed: true });
        } else {
            that.setState({ borrow_exceed: false });
        }

        if (amount_bn.gt(that.bn(that.state.available_to_borrow))) {
            that.setState({ borrow_exceed: false });
        }
    }

    that.setState({ borrow_amount: value, no_such_borrow_balance: false });

    if (Number(value) === 0) {
        that.setState({ is_borrow_enable: false, borrow_exceed: false });
        return;
    } else {
        that.setState({ is_borrow_enable: true });
    }
};

export const handle_repay_click = async ({ drizzle, amount, asset }) => {
    if (!(await readyToTransact())) throw new Error("not ready to transact");
    const web3 = drizzle.web3;
    const drizzleStore = drizzle.store.getState();
    const myAccount = drizzleStore.accounts[0];
    const network = constants.network_type[drizzleStore.web3.networkId];
    const MoneyMarketContract = drizzle.contracts.MoneyMarket;
    const token_address = address[network][`address_${asset.unit}`];

    let weiAmount = toWei(amount, asset.unit);
    if (weiAmount === asset.balance) {
        weiAmount = -1;
    }
    const balance = Object.values(drizzleStore.accountBalances)[0];
    const result = await notifyTransaction({
        estimateGas: () =>
            MoneyMarketContract.methods
                .repayBorrow(token_address, weiAmount)
                .estimateGas({ from: myAccount })
                .then((result) => result.toString()),
        gasPrice: web3.eth.getGasPrice,
        balance,
        network,
        sendTransaction: () =>
            new Promise((resolve, reject) =>
                MoneyMarketContract.methods
                    .repayBorrow(token_address, weiAmount)
                    .send({ from: myAccount }, (error, hash) =>
                        error ? reject(error) : resolve(hash)
                    )
            ),
        events: {
            txRequest: {
                message: "Please confirm your transaction",
            },
            txPool: {
                message: `Repaying ${amount} ${asset.unit} to the pool`,
            },
            txConfirmed: {
                message: `You successfully repaid ${amount} ${asset.unit} to the pool.`,
            },
        },
    });
    return result;
};

export const handle_redeem_click = async ({ drizzle, amount, asset }) => {
    if (!(await readyToTransact())) throw new Error("not ready to transact");
    const web3 = drizzle.web3;
    const drizzleStore = drizzle.store.getState();
    const myAccount = drizzleStore.accounts[0];
    const network = constants.network_type[drizzleStore.web3.networkId];
    const MoneyMarketContract = drizzle.contracts.MoneyMarket;
    const token_address = address[network][`address_${asset.unit}`];
    let weiAmount = toWei(amount, asset.unit);
    if (weiAmount === asset.balance) {
        weiAmount = -1;
    }
    const balance = Object.values(drizzleStore.accountBalances)[0];
    const result = await notifyTransaction({
        estimateGas: () =>
            MoneyMarketContract.methods
                .withdraw(token_address, weiAmount)
                .estimateGas({ from: myAccount })
                .then((result) => result.toString()),
        gasPrice: web3.eth.getGasPrice,
        balance,
        network,
        sendTransaction: () =>
            new Promise((resolve, reject) =>
                MoneyMarketContract.methods
                    .withdraw(token_address, weiAmount)
                    .send({ from: myAccount }, (error, hash) =>
                        error ? reject(error) : resolve(hash)
                    )
            ),
        events: {
            txRequest: {
                message: "Please confirm your transaction",
            },
            txPool: {
                message: `Withdrawing ${amount} ${asset.unit} from the pool`,
            },
            txConfirmed: {
                message: `You successfully withdrawn ${amount} ${asset.unit} from the pool.`,
            },
        },
    });
    return result;
};
