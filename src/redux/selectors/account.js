import _ from "lodash";

export const getAddress = state => _.get(state, "accounts[0]");
