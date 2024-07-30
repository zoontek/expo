import { Component, ReactNode } from 'react';
import {
  Appearance,
  ColorSchemeName,
  NativeEventSubscription,
  Platform,
  StatusBar,
} from 'react-native';

import ExpoSystemUI, { SystemBarsConfig } from './ExpoSystemUI';

// @ts-expect-error
const customGlobal = global as {
  _appearanceSubscription?: NativeEventSubscription;
};

export type SystemBarStyle = 'auto' | 'light' | 'dark';

export type SystemBarsProps = {
  hidden:
    | boolean
    | {
        statusBar?: boolean;
        navigationBar?: boolean;
      };
  style:
    | SystemBarStyle
    | {
        statusBar?: SystemBarStyle;
        navigationBar?: SystemBarStyle;
      };
};

export type SystemBarsStackEntry = {
  statusBarHidden: boolean | undefined;
  statusBarStyle: SystemBarStyle | undefined;
  navigationBarHidden: boolean | undefined;
  navigationBarStyle: SystemBarStyle | undefined;
};

/**
 * Merges the prop stack.
 */
function mergePropsStack(propsStack: SystemBarsStackEntry[]): SystemBarsStackEntry | null {
  const mergedEntry = propsStack.reduce<SystemBarsStackEntry>(
    (prev, cur) => {
      for (const prop in cur) {
        if (cur[prop] != null) {
          prev[prop] = cur[prop];
        }
      }
      return prev;
    },
    {
      statusBarHidden: undefined,
      statusBarStyle: undefined,
      navigationBarHidden: undefined,
      navigationBarStyle: undefined,
    }
  );

  if (
    mergedEntry.statusBarHidden == null &&
    mergedEntry.statusBarStyle == null &&
    mergedEntry.navigationBarHidden == null &&
    mergedEntry.navigationBarStyle == null
  ) {
    return null;
  } else {
    return mergedEntry;
  }
}

/**
 * Returns an object to insert in the props stack from the props.
 */
function createStackEntry({ hidden, style }: SystemBarsProps): SystemBarsStackEntry {
  return {
    statusBarHidden: typeof hidden === 'boolean' ? hidden : hidden?.statusBar,
    statusBarStyle: typeof style === 'string' ? style : style?.statusBar,
    navigationBarHidden: typeof hidden === 'boolean' ? hidden : hidden?.navigationBar,
    navigationBarStyle: typeof style === 'string' ? style : style?.navigationBar,
  };
}

export class SystemBars extends Component<SystemBarsProps> {
  private static _propsStack: SystemBarsStackEntry[] = [];

  // Timer for updating the native module values at the end of the frame.
  private static _updateImmediate: number | null = null;

  // The current merged values from the props stack.
  private static _currentValues: SystemBarsStackEntry | null = null;

  /**
   * Push a SystemBars entry onto the stack.
   * The return value should be passed to `popStackEntry` when complete.
   *
   * @param props Object containing the SystemBars props to use in the stack entry.
   */
  static pushStackEntry(props: SystemBarsProps): SystemBarsStackEntry {
    const entry = createStackEntry(props);
    SystemBars._propsStack.push(entry);
    SystemBars._updatePropsStack();
    return entry;
  }

  /**
   * Pop a SystemBars entry from the stack.
   *
   * @param entry Entry returned from `pushStackEntry`.
   */
  static popStackEntry(entry: SystemBarsStackEntry): void {
    const index = SystemBars._propsStack.indexOf(entry);
    if (index !== -1) {
      SystemBars._propsStack.splice(index, 1);
    }
    SystemBars._updatePropsStack();
  }

  /**
   * Replace an existing SystemBars stack entry with new props.
   *
   * @param entry Entry returned from `pushStackEntry` to replace.
   * @param props Object containing the SystemBars props to use in the replacement stack entry.
   */
  static replaceStackEntry(
    entry: SystemBarsStackEntry,
    props: SystemBarsProps
  ): SystemBarsStackEntry {
    const newEntry = createStackEntry(props);
    const index = SystemBars._propsStack.indexOf(entry);
    if (index !== -1) {
      SystemBars._propsStack[index] = newEntry;
    }
    SystemBars._updatePropsStack();
    return newEntry;
  }

  private _stackEntry: SystemBarsStackEntry | null = null;

  override componentDidMount() {
    // Every time a SystemBars component is mounted, we push it's prop to a stack
    // and always update the native system bars with the props from the top of then
    // stack. This allows having multiple SystemBars components and the one that is
    // added last or is deeper in the view hierarchy will have priority.
    this._stackEntry = SystemBars.pushStackEntry(this.props);
  }

  override componentDidUpdate() {
    if (this._stackEntry) {
      this._stackEntry = SystemBars.replaceStackEntry(this._stackEntry, this.props);
    }
  }

  override componentWillUnmount() {
    // When a SystemBars is unmounted, remove itself from the stack and update
    // the native bars with the next props.
    if (this._stackEntry) {
      SystemBars.popStackEntry(this._stackEntry);
    }
  }

  private static _applyStackEntry(entry: SystemBarsStackEntry, colorScheme: ColorSchemeName) {
    const { statusBarHidden, navigationBarHidden } = entry;
    const autoBarStyle = colorScheme === 'light' ? 'dark' : 'light';

    const statusBarStyle: SystemBarsConfig['statusBarStyle'] =
      entry.statusBarStyle === 'auto' ? autoBarStyle : entry.statusBarStyle;
    const navigationBarStyle: SystemBarsConfig['navigationBarStyle'] =
      entry.navigationBarStyle === 'auto' ? autoBarStyle : entry.navigationBarStyle;

    if (Platform.OS === 'ios') {
      ExpoSystemUI.setSystemBarsConfigAsync({
        statusBarStyle,
        navigationBarStyle,
        statusBarHidden,
        navigationBarHidden,
      });
    } else {
      // Emulate android behavior with react-native StatusBar
      if (statusBarStyle != null) {
        StatusBar.setBarStyle(`${statusBarStyle}-content`, true);
      }
      if (statusBarHidden != null) {
        StatusBar.setHidden(statusBarHidden, 'fade'); // 'slide' doesn't work in this context
      }
    }
  }

  /**
   * Updates the native system bars with the props from the stack.
   */
  private static _updatePropsStack() {
    // Send the update to the native module only once at the end of the frame.
    if (SystemBars._updateImmediate != null) {
      clearImmediate(SystemBars._updateImmediate);
    }

    SystemBars._updateImmediate = setImmediate(() => {
      const oldProps = SystemBars._currentValues;
      const mergedProps = mergePropsStack(SystemBars._propsStack);

      // Update the props that have changed using the merged values from the props stack.
      if (mergedProps != null) {
        // Update only if the configuration has changed.
        if (
          oldProps?.statusBarHidden !== mergedProps.statusBarHidden ||
          oldProps?.statusBarStyle !== mergedProps.statusBarStyle ||
          oldProps?.navigationBarHidden !== mergedProps.navigationBarHidden ||
          oldProps?.navigationBarStyle !== mergedProps.navigationBarStyle
        ) {
          SystemBars._applyStackEntry(
            mergedProps,
            mergedProps.statusBarStyle === 'auto' || mergedProps.navigationBarStyle === 'auto'
              ? Appearance.getColorScheme()
              : null
          );
        }

        // Update the current props values.
        SystemBars._currentValues = mergedProps;
      } else {
        // Reset current props when the stack is empty.
        SystemBars._currentValues = null;
      }
    });
  }

  override render(): ReactNode {
    return null;
  }

  private static _onAppearanceChange({ colorScheme }: Appearance.AppearancePreferences) {
    const currentValues = SystemBars._currentValues;

    if (currentValues?.statusBarStyle === 'auto' || currentValues?.navigationBarStyle === 'auto') {
      SystemBars._applyStackEntry(currentValues, colorScheme);
    }
  }

  private static _appearanceSubscription = (() => {
    const subscription =
      customGlobal._appearanceSubscription ??
      Appearance.addChangeListener(SystemBars._onAppearanceChange);

    // Workaround to subscribe once with fast-refresh
    if (__DEV__) {
      customGlobal._appearanceSubscription = subscription;
    }

    return subscription;
  })();
}
