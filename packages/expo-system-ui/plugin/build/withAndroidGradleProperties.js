"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withAndroidGradleProperties = void 0;
const config_plugins_1 = require("expo/config-plugins");
const withAndroidGradleProperties = (config) => {
    const comment = {
        type: 'comment',
        value: 'Enable edge to edge',
    };
    const property = {
        type: 'property',
        key: 'edgeToEdgeEnabled',
        value: 'true',
    };
    return (0, config_plugins_1.withGradleProperties)(config, async (config) => {
        const { modResults } = config;
        const currentIndex = modResults.findIndex((item) => item.type === 'property' && item.key === property.key);
        if (currentIndex > -1) {
            modResults[currentIndex] = property;
        }
        else {
            modResults.push(comment, property);
        }
        return {
            ...config,
            modResults,
        };
    });
};
exports.withAndroidGradleProperties = withAndroidGradleProperties;
