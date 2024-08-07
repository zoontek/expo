import { ColorValue } from 'react-native';
export type SystemBarsConfig = {
    statusBarHidden: boolean | undefined;
    statusBarStyle: 'light' | 'dark' | undefined;
    navigationBarHidden: boolean | undefined;
    navigationBarStyle: 'light' | 'dark' | undefined;
};
export type ExpoSystemUIModule = {
    getBackgroundColorAsync: () => Promise<ColorValue | null>;
    setBackgroundColorAsync: (color: ColorValue | null) => Promise<void>;
    setSystemBarsConfigAsync: (config: SystemBarsConfig) => Promise<void>;
};
declare const _default: ExpoSystemUIModule;
export default _default;
//# sourceMappingURL=ExpoSystemUI.d.ts.map