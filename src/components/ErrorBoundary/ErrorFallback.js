import React from "react";

function ErrorFallback({ error }) {
    const refreshHandler = (e) => {
        e.preventDefault();

        window.location.reload();
    };

    return (
        <div role="alert">
            <p>Something went wrong:</p>
            <pre style={{ color: "red" }}>{error.message}</pre>
            <button onClick={refreshHandler}>Refresh page</button>
        </div>
    );
}

export default ErrorFallback;
