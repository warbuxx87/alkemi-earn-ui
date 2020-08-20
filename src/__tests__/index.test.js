import React from "react";

import { App } from "index";

import { render } from "@testing-library/react";

describe("<App />", () => {
    let wrapper;

    beforeEach(() => {
        wrapper = render(<App />);
    });

    it("matches snapshot", () => {
        expect(wrapper).toMatchSnapshot();
    });
});
