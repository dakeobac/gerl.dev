export const initialState = {
  darkMode: false
};

export const themeReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_DARKMODE':
      return {
        ...state,
        darkMode: !state.darkMode
      };
    default:
      throw new Error(`Unrecognized type ${action.type}`);
  }
};