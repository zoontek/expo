"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.withAndroidEdgeToEdgeTheme = void 0;
const config_plugins_1 = require("expo/config-plugins");
const withAndroidEdgeToEdgeTheme = (config) => {
    return (0, config_plugins_1.withAndroidStyles)(config, async (config) => {
        const { modResults, userInterfaceStyle = 'automatic' } = config;
        const { resources } = modResults;
        const style = resources.style?.map((style) => {
            if (style.$.name !== 'AppTheme') {
                return style;
            }
            const item = style.item.filter(({ $ }) => $.name !== 'android:statusBarColor' && $.name !== 'android:navigationBarColor');
            if (userInterfaceStyle !== 'automatic') {
                item.push({
                    $: { name: 'darkContentBarsStyle' },
                    _: String(userInterfaceStyle === 'light'),
                });
            }
            return {
                $: { ...style.$, parent: 'Theme.EdgeToEdge' },
                item,
            };
        });
        return {
            ...config,
            modResults: {
                ...modResults,
                resources: {
                    ...resources,
                    style,
                },
            },
        };
    });
};
exports.withAndroidEdgeToEdgeTheme = withAndroidEdgeToEdgeTheme;
