export const event = ({ action, category, label, value, data = {} } = {}) => {
    if (gtag) {
        gtag("event", action, {
            event_category: category,
            event_label: label,
            value: value,
            ...data,
        });
    }
};
