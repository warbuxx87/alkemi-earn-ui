import React from "react";
import classNames from "classnames";

import withStyles from "@mui/styles/withStyles";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

import createShallow from "../createShallow";

const TestComponent = ({ classes }) => (
    <IconButton className={classNames(classes.iconButton)} size="large">
        <MenuIcon />
    </IconButton>
);

const styles = (theme) => ({
    iconButton: {
        marginLeft: 12,
        marginRight: 36,
    },
});

const Component = withStyles(styles)(TestComponent);

describe("createShallow", () => {
    it("does not dive with dive=0", () => {
        const shallow = createShallow({ dive: 0 });
        const wrapper = shallow(<Component />);
        expect(wrapper.name()).toEqual("TestComponent");
    });

    it("dives with dive=1", () => {
        const shallow = createShallow({ dive: 1 });
        const wrapper = shallow(<Component />);
        expect(wrapper.name()).toEqual("WithStyles(IconButton)");
    });

    it("dives with dive=2", () => {
        const shallow = createShallow({ dive: 2 });
        const wrapper = shallow(<Component />);
        expect(wrapper.name()).toEqual("IconButton");
    });
});
