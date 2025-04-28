import { createTheme } from '@mui/material/styles';

export const dayTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#FF4C4C', // Consistent red
    },
    secondary: {
      main: '#FFC107', // Consistent amber
    },
    background: {
      default: '#FFFFFF', // White background
      paper: '#F5F5F5',   // Light gray for cards
    },
    text: {
      primary: '#212121', // Dark gray text
      secondary: '#757575', // Medium gray text
    },
    success: {
      main: '#4CAF50', // Fresh green
    },
    warning: {
      main: '#FF9800', // Vibrant orange
    },
    error: {
      main: '#F44336', // Alert red
    },
    info: {
      main: '#2196F3', // Calming blue
    },
    divider: '#E0E0E0',
  },
});
