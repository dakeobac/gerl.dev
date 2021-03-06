import React from 'react';
import {IconButton} from 'gatsby-theme-material-ui';
import useTheme from '@material-ui/core/styles/useTheme';
import Brightness4 from '@material-ui/icons/Brightness4';
import Brightness5 from '@material-ui/icons/Brightness5';
import { useToggleDarkMode } from '../context/DispatchContext';

function DarkModeButton(props) {
  const paletteType = useTheme().palette.type;
  const _toggleDarkMode = useToggleDarkMode();
  
  return (
    <IconButton onClick={_toggleDarkMode} {...props} color={paletteType=== "dark" ? "secondary" : "primary"}>
      {paletteType === 'dark' ? <Brightness5  /> : <Brightness4  />}
    </IconButton>
  );
}

export default DarkModeButton;