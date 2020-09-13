export const compare_supply = (val1, val2) => {
    return val2.totalSupplyUSD - val1.totalSupplyUSD;
};

export const compare_borrow = (val1, val2) => {
    return val2.totalBorrowUSD - val1.totalBorrowUSD;
};
