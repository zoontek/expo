import { Component, ReactNode } from 'react';
export type SystemBarStyle = 'auto' | 'light' | 'dark';
export type SystemBarsProps = {
    hidden: boolean | {
        statusBar?: boolean;
        navigationBar?: boolean;
    };
    style: SystemBarStyle | {
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
export declare class SystemBars extends Component<SystemBarsProps> {
    private static _propsStack;
    private static _updateImmediate;
    private static _currentValues;
    /**
     * Push a SystemBars entry onto the stack.
     * The return value should be passed to `popStackEntry` when complete.
     *
     * @param props Object containing the SystemBars props to use in the stack entry.
     */
    static pushStackEntry(props: SystemBarsProps): SystemBarsStackEntry;
    /**
     * Pop a SystemBars entry from the stack.
     *
     * @param entry Entry returned from `pushStackEntry`.
     */
    static popStackEntry(entry: SystemBarsStackEntry): void;
    /**
     * Replace an existing SystemBars stack entry with new props.
     *
     * @param entry Entry returned from `pushStackEntry` to replace.
     * @param props Object containing the SystemBars props to use in the replacement stack entry.
     */
    static replaceStackEntry(entry: SystemBarsStackEntry, props: SystemBarsProps): SystemBarsStackEntry;
    private _stackEntry;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    /**
     * Updates the native system bars with the props from the stack.
     */
    private static _updatePropsStack;
    render(): ReactNode;
}
//# sourceMappingURL=SystemBars.d.ts.map