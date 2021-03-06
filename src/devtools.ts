let id = 0;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__: any;
  }
}

export function tryCreateDevToolsLogger<S>() {
  if (
    typeof window === "undefined" ||
    !("__REDUX_DEVTOOLS_EXTENSION__" in window)
  ) {
    return;
  }

  const reduxDevTools = window.__REDUX_DEVTOOLS_EXTENSION__;
  const instanceID = id;

  id += 1;

  const devTools = reduxDevTools.connect({
    name: `react-relocalux - ${instanceID}`,
    features: {}
  });

  return (action: { type: any; payload: any }, state: S) => {
    devTools.send(action, state, {}, instanceID);
  };
}
