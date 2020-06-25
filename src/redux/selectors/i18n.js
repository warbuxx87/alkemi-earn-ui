// This is for handling languages that read from right to left
export function getDir(state) {
    return state.i18n.locale === "ar" ? "rtl" : "ltr";
}
