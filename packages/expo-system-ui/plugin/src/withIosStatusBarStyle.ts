import { ConfigPlugin, withInfoPlist } from 'expo/config-plugins';

export const withIosStatusBarStyle: ConfigPlugin = (config) =>
  withInfoPlist(config, (config) => {
    const { userInterfaceStyle = 'automatic' } = config;

    config.modResults['UIStatusBarStyle'] = {
      automatic: 'UIStatusBarStyleDefault',
      dark: 'UIStatusBarStyleLightContent',
      light: 'UIStatusBarStyleDarkContent',
    }[userInterfaceStyle];

    return config;
  });
