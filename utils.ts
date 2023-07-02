const getEnv = () => {
    return window.__ENV__.NODE_ENV;
}

export const isProduction = () => getEnv() === "production";
export const isDevelopment = () => getEnv() === "development";
export const getAPI = () => {
    if (isProduction()) {
        return "https://portfolio.api.jaewook.me/api";
    } else if (isDevelopment()) {
        return "http://localhost:8888";
    }
}

export const log = {
    v: (...args) => { if (!isProduction()) console.log(...args) },
    e: (...args) => { if (!isProduction()) console.error(...args) },
    w: (...args) => { if (!isProduction()) console.warn(...args) },
    i: (...args) => { if (!isProduction()) console.info(...args) },
    d: (...args) => { if (!isProduction()) console.debug(...args) },
};
