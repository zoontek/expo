"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withAndroidGradleProperties = void 0;
const config_plugins_1 = require("expo/config-plugins");
const withAndroidGradleProperties = (config) => {
    const key = 'EdgeToEdge_enable';
    return (0, config_plugins_1.withGradleProperties)(config, async (config) => {
        const modResults = config.modResults.filter((item) => item.type !== 'property' || item.key !== key);
        modResults.push({
            type: 'property',
            key,
            value: 'true',
        });
        return {
            ...config,
            modResults,
        };
    });
};
exports.withAndroidGradleProperties = withAndroidGradleProperties;
