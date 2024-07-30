import { requireNativeModule } from 'expo-modules-core';
import { ColorValue } from 'react-native';

type SystemBarsConfig = {
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

export default requireNativeModule<ExpoSystemUIModule>('ExpoSystemUI');
