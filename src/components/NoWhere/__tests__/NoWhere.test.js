import React from "react";
import toJson from "enzyme-to-json";

import ReportIcon from "@mui/icons-material/Report";

import NoWhere from "../NoWhere";
import NoWhereDashboardButton from "containers/NoWhere/DashboardButton";
import createShallow from "utils/tests-utils/createShallow";

import ComponentsWrapper from "utils/tests-utils/ComponentsWrapper";

describe("<NoWhere />", () => {
    let shallow;
    let wrapper;

    beforeAll(() => {
        shallow = createShallow({ dive: 1 });
    });

    beforeEach(() => {
        wrapper = shallow(
            <ComponentsWrapper>
                <NoWhere />
            </ComponentsWrapper>
        );
    });

    it("matches snapshot", () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
