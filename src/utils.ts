const getEnv = () => {
    return window.__ENV__.NODE_ENV;
}

const isProduction = () => getEnv() === "production";

export const log = {
    v: (...args) => { if (!isProduction()) console.log(...args) },
    e: (...args) => { if (!isProduction()) console.error(...args) },
    w: (...args) => { if (!isProduction()) console.warn(...args) },
    i: (...args) => { if (!isProduction()) console.info(...args) },
    d: (...args) => { if (!isProduction()) console.debug(...args) },
};
