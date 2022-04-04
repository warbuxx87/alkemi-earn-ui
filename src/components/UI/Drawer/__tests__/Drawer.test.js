import React from "react";
import toJson from "enzyme-to-json";

import Drawer from "../Drawer";
import createShallow from "utils/tests-utils/createShallow";

import { ThemeProvider } from "@mui/material";

import theme from "themes/theme";

describe("<Drawer />", () => {
    let shallow;
    let wrapper;

    beforeAll(() => {
        shallow = createShallow({ dive: 0 });
    });
    beforeEach(() => {
        wrapper = shallow(
            <ThemeProvider theme={theme}>
                <Drawer
                    asset={{}}
                    buttonsLabel="Borrow"
                    triggerButtonVariant="contained"
                    enableButtonClick={false}
                    onButtonClick={({ asset, amount }) =>
                        onBorrowAction({ drizzle: {}, asset: {}, amount: "0" })
                    }
                    isDoingAction={false}
                    usdPrice={"0"}
                    onSetMax={() => {}}
                    amount={"0"}
                    setAmount={() => {}}
                    mainTitle={`Drawer title`}
                    balanceValue={"$1.00"}
                    amountValue={`Amount value`}
                    walletIsKYCd={true}
                />
            </ThemeProvider>
        );
    });

    it("matches snapshot", () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
