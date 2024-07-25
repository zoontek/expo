import { ConfigPlugin, withGradleProperties } from 'expo/config-plugins';

export const withAndroidGradleProperties: ConfigPlugin = (config) => {
  const comment = {
    type: 'comment',
    value: 'Enable edge to edge',
  } as const;

  const property = {
    type: 'property',
    key: 'expo.enableEdgeToEdge',
    value: 'true',
  } as const;

  return withGradleProperties(config, async (config) => {
    const { modResults } = config;

    const currentIndex = modResults.findIndex(
      (item) => item.type === 'property' && item.key === property.key
    );

    if (currentIndex > -1) {
      modResults[currentIndex] = property;
    } else {
      modResults.push(comment, property);
    }

    return {
      ...config,
      modResults,
    };
  });
};
