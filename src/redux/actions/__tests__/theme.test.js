import {
    changeThemeDark,
    changeThemeLight,
    CHANGE_THEME_DARK,
    CHANGE_THEME_LIGHT,
} from "../ui/theme";

describe("changeThemeDark", () => {
    it("returns an action of type $`{CHANGE_THEME_DARK}`", () => {
        expect(changeThemeDark().type).toEqual(CHANGE_THEME_DARK);
    });
});

describe("changeThemeLight", () => {
    it("return an action of type $`{CHANGE_THEME_LIGHT}`", () => {
        expect(changeThemeLight().type).toEqual(CHANGE_THEME_LIGHT);
    });
});
