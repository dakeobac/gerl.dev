import React from 'react';

export const DispatchContext = React.createContext(() => {
  throw new Error('Forgot to wrap component in `ThemeProvider`');
});

export function useToggleDarkMode() {
  const dispatch = React.useContext(DispatchContext);
  return React.useCallback(() => dispatch({ type: 'TOGGLE_DARKMODE' }), [
    dispatch
  ]);
}