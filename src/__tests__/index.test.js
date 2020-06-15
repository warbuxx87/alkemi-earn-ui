import React from "react";
import { shallow } from "enzyme";
import toJson from "enzyme-to-json";

import { App } from "index";

describe("<App />", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<App />);
    });

    it("matches snapshot", () => {
        expect(wrapper.find(App)).toMatchSnapshot();
    });
});
