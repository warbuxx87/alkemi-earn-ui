import { readyToTransact } from "utils/onboard"; // TODO: Should probably be replaced by checking if address is selected and such
import { toWei } from "utils/ui";
import address from "constants/address_map.json";
import constants from "constants/constant.json";
import { initAssetContract } from "utils/contracts";

// testing web3 sendTx
import MoneyMarket_ABI from "constants/ABI/MoneyMarket_ABI.json";
import Web3 from "web3";

// Approve Unlimited amount of ERC20 tokens to interact with protocol
export const handle_approve_click = async ({
    drizzle,
    userWalletNetwork,
    asset,
    userWalletAddress,
}) => {
    if (!(await readyToTransact())) throw new Error("not ready to transaction");
    const myAccount = userWalletAddress;
    const network = constants.network_type[userWalletNetwork];

    const address_MoneyMarket = address[network].address_MoneyMarket;

    const tokenContract = initAssetContract({
        drizzle,
        userWalletAddress: myAccount,
        asset: asset.unit,
    });
    const sendApprove = tokenContract.methods.approve.cacheSend(
        address_MoneyMarket,
        constants.max_uint,
        {
            from: myAccount,
        }
    );
    return sendApprove;
};

// Mint new Test Tokens
export const handle_allocate_click = async ({
    drizzle,
    userWalletAddress,
    asset,
    amount,
    shouldSendMax,
}) => {
    if (!(await readyToTransact())) throw new Error("not ready to transact");
    const myAccount = userWalletAddress;
    const unit = asset.unit;
    const tokenContract = drizzle.contracts[unit];

    let weiAmount = amount;
    if (shouldSendMax !== true) weiAmount = toWei(amount, unit);

    const sendAllocate = tokenContract.methods.allocateTo.cacheSend(
        myAccount,
        weiAmount,
        {
            from: myAccount,
        }
    );
    return sendAllocate;
};

// generic MoneyMarketContract tx handler
export const handle_moneymarket_tx = async ({
    userWalletNetwork,
    userWalletAddress,
    userWalletName,
    amount,
    asset,
    shouldSendMax,
    handleETHCallsSeparately,
    selectedMethod,
}) => {
    return new Promise(async (resolve, reject) => {
        if (!(await readyToTransact()))
            throw new Error("not ready to transact");

        const myAccount = userWalletAddress;
        const network = constants.network_type[userWalletNetwork];
        const token_address = address[network][`address_${asset.unit}`];

        let weiAmount = amount;
        if (shouldSendMax !== true) weiAmount = toWei(amount, unit);

        const unit = asset.unit;

        let sendTx = {};

        const sendValue =
            handleETHCallsSeparately === true &&
            (unit === "WETH" || unit === "ETH"); // For ETHs deposits/borrow are handled differently

        const web3 = new Web3(window.currentlyUsedProvider); // could be replaced by window.currentlyUsedProvider

        const address_MoneyMarket = address[network].address_MoneyMarket;

        const MoneyMarketContract = new web3.eth.Contract(
            MoneyMarket_ABI,
            address_MoneyMarket
        );

        const getData = MoneyMarketContract.methods[selectedMethod](
            token_address,
            weiAmount
        ).encodeABI();

        const dataToSend = {
            to: address_MoneyMarket,
            from: myAccount,
            data: getData,
        };

        if (sendValue) dataToSend.value = weiAmount;

        web3.eth.sendTransaction(dataToSend, (error, receipt) => {
            if (error) console.error("error: ", error);
            else {
                console.log("receipt: ", receipt);

                sendTx.txHash = receipt; // this is NOT necessarily the tx hash on the blockchain (For metamask yes, for walletconnect it's the safetx)
                sendTx.userWalletName = userWalletName;

                resolve(sendTx);
            }
        });
    });
};

// Deposit Tokens to Lending Pool
export const handle_deposit_click = async ({
    drizzle,
    userWalletNetwork,
    userWalletAddress,
    userWalletName,
    amount,
    asset,
    shouldSendMax,
}) => {
    // console.log('userWalletName: ', userWalletName)

    if (!(await readyToTransact())) throw new Error("not ready to transact");
    const myAccount = userWalletAddress;
    const network = constants.network_type[userWalletNetwork];
    const MoneyMarketContract = drizzle.contracts.MoneyMarket;
    const token_address = address[network][`address_${asset.unit}`];
    const unit = asset.unit;

    let weiAmount = amount;
    if (shouldSendMax !== true) weiAmount = toWei(amount, unit);

    let sendDeposit;
    if (unit === "WETH" || unit === "ETH") {
        sendDeposit = MoneyMarketContract.methods.supply.cacheSend(
            token_address,
            weiAmount,
            {
                from: myAccount,
                value: weiAmount,
            }
        );
    } else {
        // sendDeposit = MoneyMarketContract.methods.supply.cacheSend(
        //     token_address,
        //     weiAmount,
        //     {
        //         from: myAccount,
        //     }
        // );

        const address_MoneyMarket = address[network].address_MoneyMarket;
        const web3 = new Web3(window.currentlyUsedProvider);

        var myContract = new web3.eth.Contract(
            MoneyMarket_ABI,
            address_MoneyMarket
        );
        // suppose you want to call a function named myFunction of myContract
        var getData = myContract.methods
            .supply(token_address, weiAmount)
            .encodeABI();
        // finally pass this data parameter to send Transaction

        console.log("sending tx");
        let recei = null;
        web3.eth.sendTransaction(
            { to: address_MoneyMarket, from: myAccount, data: getData },
            (error, receipt) => {
                if (error) console.error("error: ", error);
                else {
                    console.log("receipt: ", receipt);

                    //   recei = receipt

                    //   fetch(`https://safe-transaction.rinkeby.gnosis.io/api/v1/multisig-transactions/${receipt}`)
                    //     .then((res) => {
                    //         console.log('1st res: ', res)
                    //         return res.json();
                    //     })
                    //     .then((data) => {
                    //         console.log('1st fetch data: ', data)
                    //     });
                }
            }
        );

        // For faster processing of walletconnect calls, use subscribe
        // var subscription = web3.eth.subscribe('logs', {
        // address: myAccount,
        // }, async function(error, result){

        // let counter = 0
        // let setInter = setInterval(function(){ fff() }, 500);

        // const fff = () => {
        //     fetch(`https://safe-transaction.rinkeby.gnosis.io/api/v1/multisig-transactions/${recei}`)
        //     .then((res) => {
        //         // console.log('2nd res: ', res)
        //         return res.json();
        //     })
        //     .then((data) => {
        //         counter += 500
        //         console.log('2nd fetch data: ', data)
        //         console.log('counter: ', counter, 'ms')
        //     });
        // }
    }

    return sendDeposit;
};

// Borrow Tokens from Lending Pool
export const handle_borrow_click = async ({
    drizzle,
    userWalletNetwork,
    userWalletAddress,
    amount,
    asset,
    shouldSendMax,
}) => {
    if (!(await readyToTransact())) throw new Error("not ready to transact");
    const myAccount = userWalletAddress;
    const network = constants.network_type[userWalletNetwork];
    const MoneyMarketContract = drizzle.contracts.MoneyMarket;
    const token_address = address[network][`address_${asset.unit}`];
    const unit = asset.unit;

    let weiAmount = amount;
    if (shouldSendMax !== true) weiAmount = toWei(amount, unit);

    const sendBorrow = MoneyMarketContract.methods.borrow.cacheSend(
        token_address,
        weiAmount,
        {
            from: myAccount,
        }
    );
    return sendBorrow;
};

// Repay Borrowed Tokens from wallet back to Lending Pool
export const handle_repay_click = async ({
    drizzle,
    userWalletNetwork,
    userWalletAddress,
    amount,
    asset,
    shouldSendMax,
}) => {
    if (!(await readyToTransact())) throw new Error("not ready to transact");
    const myAccount = userWalletAddress;
    const network = constants.network_type[userWalletNetwork];
    const MoneyMarketContract = drizzle.contracts.MoneyMarket;
    const token_address = address[network][`address_${asset.unit}`];
    const unit = asset.unit;

    let weiAmount = amount;
    if (shouldSendMax !== true) weiAmount = toWei(amount, unit);

    let sendRepay;

    if (unit === "WETH" || unit === "ETH") {
        sendRepay = MoneyMarketContract.methods.repayBorrow.cacheSend(
            token_address,
            weiAmount,
            {
                from: myAccount,
                value: weiAmount,
            }
        );
    } else {
        sendRepay = MoneyMarketContract.methods.repayBorrow.cacheSend(
            token_address,
            weiAmount,
            {
                from: myAccount,
            }
        );
    }
    return sendRepay;
};

// Withdraw tokens from lending pool
export const handle_withdraw_click = async ({
    drizzle,
    userWalletNetwork,
    userWalletAddress,
    amount,
    asset,
    shouldSendMax,
}) => {
    if (!(await readyToTransact())) throw new Error("not ready to transact");
    const myAccount = userWalletAddress;
    const network = constants.network_type[userWalletNetwork];
    const MoneyMarketContract = drizzle.contracts.MoneyMarket;
    const token_address = address[network][`address_${asset.unit}`];
    const unit = asset.unit;

    let weiAmount = amount;
    if (shouldSendMax !== true) weiAmount = toWei(amount, unit);

    const sendWithdraw = MoneyMarketContract.methods.withdraw.cacheSend(
        token_address,
        weiAmount,
        {
            from: myAccount,
        }
    );
    return sendWithdraw;
};

// Borrow Tokens from Lending Pool
export const handle_liquidate_click = async ({
    drizzle,
    userWalletNetwork,
    userWalletAddress,
    symbol,
    amount,
    assetCollateral,
    assetBorrow,
    targetAccount,
}) => {
    if (!(await readyToTransact())) throw new Error("not ready to transact");
    const myAccount = userWalletAddress;
    //const network = constants.network_type[userWalletNetwork];
    const MoneyMarketContract = drizzle.contracts.MoneyMarket;
    //const token_address = address[network][`address_${symbol}`];
    let weiAmount = amount.toString();

    if (weiAmount === "-1") {
        weiAmount = constants.max_uint;
    } else {
        weiAmount = toWei(amount, symbol);
    }

    const sendLiquidate = MoneyMarketContract.methods.liquidateBorrow.cacheSend(
        targetAccount,
        assetBorrow,
        assetCollateral,
        weiAmount,
        {
            from: myAccount,
        }
    );

    return sendLiquidate;
};

// Estimate method gas, NOT very reliable, since I noticed different values on metamask, but does the trick for the most part
export const estimateGasForMethod = async ({
    drizzle,
    userWalletNetwork,
    userWalletAddress,
    estimationOfGasPrice,
    method,
}) => {
    if (!(await readyToTransact())) throw new Error("not ready to transact");
    if (!method) throw new Error("Must select a method");

    const myAccount = userWalletAddress;
    const network = constants.network_type[userWalletNetwork];
    const MoneyMarketContract = drizzle.contracts.MoneyMarket;
    const token_address = address[network][`address_WETH`];

    const estimateMethodCall = await MoneyMarketContract.methods[method](
        token_address,
        "1"
    ).estimateGas({
        from: myAccount,
        gasPrice: estimationOfGasPrice,
        value: "1", // making the estimation if the user wants to send 1 wei, not great, but a value is better than none, and as the call is async, we cannot set an amount dynamically, it won't resolve in time to be properly responsive
    });

    return estimateMethodCall;
};
