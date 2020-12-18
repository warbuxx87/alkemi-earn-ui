import React from "react";
import packageJson from "../package.json";
global.appVersion = packageJson.version;

// version from response - first param, local version second param
const semverGreaterThan = (versionA, versionB) => {
    const versionsA = versionA.split(/\./g);

    const versionsB = versionB.split(/\./g);
    while (versionsA.length || versionsB.length) {
        const a = Number(versionsA.shift());

        const b = Number(versionsB.shift());
        // eslint-disable-next-line no-continue
        if (a === b) continue;
        // eslint-disable-next-line no-restricted-globals
        return a > b || isNaN(b);
    }
    return false;
};

const CacheBuster = ({ ...props }) => {
    // delete browser cache and reload
    const refreshCacheAndReload = () => {
        console.log("Clearing cache and hard reloading...");
        if (caches) {
            // Service worker cache should be cleared with caches.delete()
            caches.keys().then(function (names) {
                for (let name of names) caches.delete(name);
            });
        }

        window.location.reload();
    };

    // Check current loaded version against new one
    React.useEffect(() => {
        const checkVersionAndUpdateApp = () => {
            fetch("/meta.json")
                .then((response) => response.json())
                .then((meta) => {
                    const latestVersion = meta.version;
                    const currentVersion = global.appVersion;

                    const shouldForceRefresh = semverGreaterThan(
                        latestVersion,
                        currentVersion
                    );
                    if (shouldForceRefresh) {
                        console.log(
                            `We have a new version - ${latestVersion}. will force refresh.`
                        );
                        refreshCacheAndReload();
                    } else {
                        console.log(
                            `You already have the latest version - ${latestVersion}. No cache refresh needed.`
                        ); // TODO: Comment out this log once we are certain the caching works
                    }
                });
        };

        checkVersionAndUpdateApp();
    }, []);

    return props.children;
};

export default CacheBuster;
