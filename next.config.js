// @ts-check

const { createVanillaExtractPlugin } = require("@vanilla-extract/next-plugin");
const withVanillaExtract = createVanillaExtractPlugin();

/**
 * @type {import("next").NextConfig}
 */
const config = {
  crossOrigin: "anonymous",
};

module.exports = withVanillaExtract(config);
