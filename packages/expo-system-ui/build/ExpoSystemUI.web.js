export default {
    darkModeEnabled: typeof window !== 'undefined' &&
        'matchMedia' in window &&
        window.matchMedia('(prefers-color-scheme: dark)').matches,
    getBackgroundColorAsync() {
        if (typeof window === 'undefined') {
            return null;
        }
        const normalizeColor = require('react-native-web/dist/cjs/modules/normalizeColor');
        return normalizeColor(document.body.style.backgroundColor);
    },
    async setBackgroundColorAsync(color) {
        if (typeof window !== 'undefined') {
            document.body.style.backgroundColor = (typeof color === 'string' ? color : null) ?? 'white';
        }
    },
    setSystemBarsConfig() { }, // noop on web
};
//# sourceMappingURL=ExpoSystemUI.web.js.map