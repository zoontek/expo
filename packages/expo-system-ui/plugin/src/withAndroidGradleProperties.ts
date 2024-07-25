import { ConfigPlugin, withGradleProperties } from 'expo/config-plugins';

export const withAndroidGradleProperties: ConfigPlugin = (config) => {
  const key = 'EdgeToEdge_enable';

  return withGradleProperties(config, async (config) => {
    const modResults = config.modResults.filter(
      (item) => item.type !== 'property' || item.key !== key
    );

    modResults.push({
      type: 'property',
      key,
      value: 'true',
    });

    return {
      ...config,
      modResults,
    };
  });
};
