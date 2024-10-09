export type Listener = (state: any) => void;
export declare function createStore<TValue>(initialState: TValue): {
    getSnapshot: () => TValue;
    setState: (newState: TValue) => void;
    subscribe: (listener: Listener) => () => boolean;
};
