import { createTheme } from '@mui/material/styles';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FF4C4C', // Appetite-stimulating red
    },
    secondary: {
      main: '#FFC107', // Warm amber
    },
    background: {
      default: '#121212', // Dark background
      paper: '#1E1E1E',   // Slightly lighter for cards
    },
    text: {
      primary: '#FFFFFF', // White text
      secondary: '#B0B0B0', // Light gray text
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
    divider: '#2C2C2C',
  },
});


// export const darkTheme = createTheme({
//     palette: {
//       mode: "dark",  // This sets the theme mode to dark, applying dark colors globally.
//       primary: { },  // The primary color palette, typically used for things like buttons, active states, etc.
//       secondary: { }, // The secondary color palette, used for secondary elements, like secondary buttons.
//       background: { }, // Defines the background color for the UI.
//       warning: { }, // Defines the warning color (usually yellow/orange tones).
//       error: { }, // Defines the error color (usually red).
//       text: { }, // Defines the color for text.
//       info: { }, // Defines the color for informational elements (often blue).
//       success: { }, // Defines the color for success messages (often green).
//       action: { }, // Defines the color for actions (hover, selected states, etc.).
//       common: { }, // Common colors shared across the application (like black, white, etc.).
//     }
//   });
