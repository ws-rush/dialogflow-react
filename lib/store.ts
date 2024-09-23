export type Listener = (state: any) => void

export function createStore<TValue>(initialState: TValue) {
  let currentState = initialState

  const listeners = new Set<Listener>()

  return {
    getSnapshot: () => currentState,
    setState: (newState: TValue) => {
      currentState = { ...currentState, ...newState }
      for (const listener of listeners) listener(currentState)
    },
    subscribe: (listener: Listener) => {
      listeners.add(listener)
      return () => listeners.delete(listener)
    }
  }
}