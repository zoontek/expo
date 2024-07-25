import { ConfigPlugin, createRunOncePlugin, withPlugins } from 'expo/config-plugins';

import { withAndroidEdgeToEdgeTheme } from './withAndroidEdgeToEdgeTheme';
import { withAndroidRootViewBackgroundColor } from './withAndroidRootViewBackgroundColor';
import { withAndroidUserInterfaceStyle } from './withAndroidUserInterfaceStyle';
import { withIosRootViewBackgroundColor } from './withIosRootViewBackgroundColor';
import { withIosUserInterfaceStyle } from './withIosUserInterfaceStyle';

const pkg = require('expo-system-ui/package.json');

const withSystemUI: ConfigPlugin = (config) => {
  const { experiments = {} } = config;
  const { edgeToEdge = false } = experiments;

  const plugins = [
    withAndroidRootViewBackgroundColor,
    withIosRootViewBackgroundColor,
    withAndroidUserInterfaceStyle,
    withIosUserInterfaceStyle,
  ];

  if (edgeToEdge) {
    plugins.push(withAndroidEdgeToEdgeTheme);
  }

  return withPlugins(config, plugins);
};

export default createRunOncePlugin(withSystemUI, pkg.name, pkg.version);
