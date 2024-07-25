"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withIosStatusBarStyle = void 0;
const config_plugins_1 = require("expo/config-plugins");
const withIosStatusBarStyle = (config) => (0, config_plugins_1.withInfoPlist)(config, (config) => {
    const { userInterfaceStyle = 'automatic' } = config;
    config.modResults['UIStatusBarStyle'] = {
        automatic: 'UIStatusBarStyleDefault',
        dark: 'UIStatusBarStyleLightContent',
        light: 'UIStatusBarStyleDarkContent',
    }[userInterfaceStyle];
    return config;
});
exports.withIosStatusBarStyle = withIosStatusBarStyle;
