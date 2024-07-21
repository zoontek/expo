import { ColorValue, Platform, processColor, Appearance, StatusBar } from 'react-native';

import ExpoSystemUI from './ExpoSystemUI';
import type { SystemBarsConfig } from './ExpoSystemUI';

export type { SystemBarStyle } from './ExpoSystemUI';

/**
 * Changes the root view background color.
 * Call this function in the root file outside of you component.
 *
 * @example
 * ```ts
 * SystemUI.setBackgroundColorAsync("black");
 * ```
 * @param color Any valid [CSS 3 (SVG) color](http://www.w3.org/TR/css3-color/#svg-color).
 */
export async function setBackgroundColorAsync(color: ColorValue | null): Promise<void> {
  if (color == null) {
    return await ExpoSystemUI.setBackgroundColorAsync(null);
  } else {
    const colorNumber = Platform.OS === 'web' ? color : processColor(color);
    return await ExpoSystemUI.setBackgroundColorAsync(colorNumber as ColorValue | null);
  }
}

/**
 * Gets the root view background color.
 *
 * @example
 * ```ts
 * const color = await SystemUI.getBackgroundColorAsync();
 * ```
 * @returns Current root view background color in hex format. Returns `null` if the background color is not set.
 */
export async function getBackgroundColorAsync(): Promise<ColorValue | null> {
  return await ExpoSystemUI.getBackgroundColorAsync();
}

export function setSystemBarsConfig(config: SystemBarsConfig): void {
  const { statusBarStyle, navigationBarStyle, statusBarHidden, navigationBarHidden } = config;
  const colorScheme = Appearance.getColorScheme() ?? 'light';
  const autoBarStyle = colorScheme === 'light' ? 'dark' : 'light';

  if (Platform.OS === 'ios') {
    // Emulate android behavior with StatusBar from react-native
    if (statusBarStyle != null) {
      StatusBar.setBarStyle(
        `${statusBarStyle === 'auto' ? autoBarStyle : statusBarStyle}-content` as const,
        true
      );
    }
    if (statusBarHidden != null) {
      StatusBar.setHidden(statusBarHidden, 'slide'); // TODO: slide doesn't seem to work in this context
    }
  } else {
    ExpoSystemUI.setSystemBarsConfig({
      statusBarStyle: statusBarStyle === 'auto' ? autoBarStyle : statusBarStyle,
      navigationBarStyle: navigationBarStyle === 'auto' ? autoBarStyle : navigationBarStyle,
      statusBarHidden,
      navigationBarHidden,
    });
  }
}
