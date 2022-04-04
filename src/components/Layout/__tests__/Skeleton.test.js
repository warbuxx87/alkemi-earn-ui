import React from "react";
import toJson from "enzyme-to-json";

import LayoutSkeleton from "../Skeleton";
import LayoutContent from "containers/Layout/Content";
import AppBar from "containers/AppBar/AppBar";
import Sidebar from "containers/Sidebar/Sidebar";
import createShallow from "utils/tests-utils/createShallow";

import { ThemeProvider } from "@mui/material";

import theme from "themes/theme";

describe("<LayoutSkeleton />", () => {
    let shallow;
    let wrapper;

    beforeAll(() => {
        shallow = createShallow({ dive: 1 });
    });

    beforeEach(() => {
        wrapper = shallow(
            <ThemeProvider theme={theme}>
                <LayoutSkeleton />
            </ThemeProvider>
        );
    });

    it("matches snapshot", () => {
        expect(toJson(wrapper)).toMatchSnapshot();
    });
});
