import * as Sentry from "@sentry/react";

// ...

const sentryReduxEnhancer = Sentry.createReduxEnhancer({
    // Optionally pass options
});

export default sentryReduxEnhancer;
