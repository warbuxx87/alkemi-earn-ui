// Declare action type as a constant
export const CHANGE_THEME_DARK = "CHANGE_THEME_DARK";

// Declare action creator
export const changeThemeDark = () => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: CHANGE_THEME_DARK,
});

// Declare action type as a constant
export const CHANGE_THEME_LIGHT = "CHANGE_THEME_LIGHT";

// Declare action creator
export const changeThemeLight = () => ({
    // Respect FSA standard format (type, payload, meta properties)
    type: CHANGE_THEME_LIGHT,
});
