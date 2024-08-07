"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_plugins_1 = require("expo/config-plugins");
const withAndroidEdgeToEdgeTheme_1 = require("./withAndroidEdgeToEdgeTheme");
const withAndroidGradleProperties_1 = require("./withAndroidGradleProperties");
const withAndroidRootViewBackgroundColor_1 = require("./withAndroidRootViewBackgroundColor");
const withAndroidUserInterfaceStyle_1 = require("./withAndroidUserInterfaceStyle");
const withIosRootViewBackgroundColor_1 = require("./withIosRootViewBackgroundColor");
const withIosStatusBarStyle_1 = require("./withIosStatusBarStyle");
const withIosUserInterfaceStyle_1 = require("./withIosUserInterfaceStyle");
const pkg = require('expo-system-ui/package.json');
const withSystemUI = (config) => {
    const { experiments = {} } = config;
    const { edgeToEdge = false } = experiments;
    const plugins = [
        withAndroidRootViewBackgroundColor_1.withAndroidRootViewBackgroundColor,
        withIosRootViewBackgroundColor_1.withIosRootViewBackgroundColor,
        withAndroidUserInterfaceStyle_1.withAndroidUserInterfaceStyle,
        withIosUserInterfaceStyle_1.withIosUserInterfaceStyle,
    ];
    if (edgeToEdge) {
        plugins.push(withAndroidEdgeToEdgeTheme_1.withAndroidEdgeToEdgeTheme, withAndroidGradleProperties_1.withAndroidGradleProperties, withIosStatusBarStyle_1.withIosStatusBarStyle);
    }
    return (0, config_plugins_1.withPlugins)(config, plugins);
};
exports.default = (0, config_plugins_1.createRunOncePlugin)(withSystemUI, pkg.name, pkg.version);
