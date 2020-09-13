import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";

import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

// Configure connected-react-router
export const history = createBrowserHistory();

Sentry.init({
    tracesSampleRate: 1,
    integrations: [
        new Integrations.BrowserTracing({
            routingInstrumentation: Sentry.reactRouterV5Instrumentation(
                history
            ),
        }),
    ],
});

export default routerMiddleware(history);
