import { CHANGE_THEME_DARK, CHANGE_THEME_LIGHT } from "../../actions/ui/theme";

const initialState = {
    dark: true,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_THEME_DARK:
            return {
                ...state,
                dark: true,
            };

        case CHANGE_THEME_LIGHT:
            return {
                ...state,
                dark: false,
            };

        default:
            return state;
    }
};
