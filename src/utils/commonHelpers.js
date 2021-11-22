// For the lack of a better name, this will be used for common helper function for lend and borrow

// Set block avg period in the smart contracts
export const blockAvgPeriod = 13.3;

// Calculate lend or borrow APR
export function calculateInterest(rateMantissa) {
    const total_blocks_per_year = 2371128; // Math.round((3600 * 24 * 365) / blockAvgPeriod)
    let rateAPY = (rateMantissa * total_blocks_per_year) / 1e18;
    return rateAPY;
}
