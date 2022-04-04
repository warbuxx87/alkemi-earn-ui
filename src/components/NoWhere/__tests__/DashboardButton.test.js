import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import NoWhereDashboardButton from "../DashboardButton";

import ComponentsWrapper from "utils/tests-utils/ComponentsWrapper";

describe("<BackDashboardButton />", () => {
    let wrapper;
    let props;

    beforeEach(() => {
        props = {
            onClick: jest.fn(),
        };
        wrapper = shallow(
            <ComponentsWrapper>
                <NoWhereDashboardButton {...props} />
            </ComponentsWrapper>
        ).dive();
    });

    it("matches snapshot", () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
