import { createStore } from "redux";
import {
    setLocale,
    loadTranslations,
    syncTranslationWithStore,
} from "react-redux-i18n";
import rootReducer from "./reducers/index";
import translations from "../constants/translations";

const store = createStore(rootReducer);

syncTranslationWithStore(store);
store.dispatch(loadTranslations(translations));
store.dispatch(setLocale("en"));

export default store;
