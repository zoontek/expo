import { ConfigPlugin, createRunOncePlugin, withPlugins } from 'expo/config-plugins';

import { withAndroidEdgeToEdgeTheme } from './withAndroidEdgeToEdgeTheme';
import { withAndroidGradleProperties } from './withAndroidGradleProperties';
import { withAndroidRootViewBackgroundColor } from './withAndroidRootViewBackgroundColor';
import { withAndroidUserInterfaceStyle } from './withAndroidUserInterfaceStyle';
import { withIosRootViewBackgroundColor } from './withIosRootViewBackgroundColor';
import { withIosStatusBarStyle } from './withIosStatusBarStyle';
import { withIosUserInterfaceStyle } from './withIosUserInterfaceStyle';

const pkg = require('expo-system-ui/package.json');

const withSystemUI: ConfigPlugin = (config) => {
  const { experiments = {} } = config;
  const { edgeToEdge = false } = experiments;

  return withPlugins(config, [
    withAndroidRootViewBackgroundColor,
    withIosRootViewBackgroundColor,
    withAndroidUserInterfaceStyle,
    withIosUserInterfaceStyle,

    ...(edgeToEdge
      ? [withAndroidEdgeToEdgeTheme, withAndroidGradleProperties, withIosStatusBarStyle]
      : []),
  ]);
};

export default createRunOncePlugin(withSystemUI, pkg.name, pkg.version);
