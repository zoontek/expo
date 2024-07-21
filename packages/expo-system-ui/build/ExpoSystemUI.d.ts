import type { ColorValue } from 'react-native';
export type SystemBarStyle = 'auto' | 'light' | 'dark';
export type SystemBarsConfig = {
    statusBarStyle?: SystemBarStyle;
    navigationBarStyle?: SystemBarStyle;
    statusBarHidden?: boolean;
    navigationBarHidden?: boolean;
};
export type ExpoSystemUIModule = {
    darkModeEnabled: boolean;
    getBackgroundColorAsync: () => Promise<ColorValue | null>;
    setBackgroundColorAsync: (color: ColorValue | null) => Promise<void>;
    setSystemBarsConfig: (config: SystemBarsConfig) => void;
};
declare const _default: ExpoSystemUIModule;
export default _default;
//# sourceMappingURL=ExpoSystemUI.d.ts.map