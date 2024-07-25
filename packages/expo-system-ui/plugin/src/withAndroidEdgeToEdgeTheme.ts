import { ConfigPlugin, withAndroidStyles } from 'expo/config-plugins';

export const withAndroidEdgeToEdgeTheme: ConfigPlugin = (config) => {
  return withAndroidStyles(config, async (config) => {
    const { modResults, userInterfaceStyle = 'automatic' } = config;
    const { resources } = modResults;
    const { style = [] } = resources;

    const updatedStyle = style.map((style): typeof style => {
      if (style.$.name !== 'AppTheme') {
        return style;
      }

      const item = style.item.filter(
        ({ $ }) => $.name !== 'android:statusBarColor' && $.name !== 'android:navigationBarColor'
      );

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
          style: updatedStyle,
        },
      },
    };
  });
};
