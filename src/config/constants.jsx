import {Dimensions} from 'react-native';
import store from '../redux/store';
const {width, height} = Dimensions.get('window');

// Define colors for light and dark themes
const lightColors = {
  primaryBackground: '#FFFFFF',
  secondaryBackground: '#F5F5F5',
  inputBackground: '#EEEEEE',
  primaryText: '#333333',
  secondaryText: '#666666',
  placeholderText: '#999999',
  messageBubbleUser: '#4A90E2',
  messageBubbleAI: '#F0F0F0',
  primary: '#4A90E2',
  secondary: '#34C759',
  accent: '#5856D6',
  iconActive: '#4A90E2',
  iconInactive: '#666666',
  headerBackground: '#FFFFFF',
  border: '#E0E0E0',
  codeBlockBackground: '#F5F5F5',
  loadingText: '#666666',
};

const darkColors = {
  primaryBackground: '#1A1A1A',
  secondaryBackground: '#2A2A2A',
  inputBackground: '#3A3A3A',
  primaryText: '#FFFFFF',
  secondaryText: '#CCCCCC',
  placeholderText: '#999999',
  messageBubbleUser: '#4A90E2',
  messageBubbleAI: '#2A2A2A',
  primary: '#4A90E2',
  secondary: '#32D74B', //
  accent: '#5E5CE6', //
  iconActive: '#4A90E2', //
  iconInactive: '#666666',
  headerBackground: '#2A2A2A', //
  codeBlockBackground: '#1E1E1E', //
  loadingText: '#FFFFFF', //
};

const fontSizes = {
  small: width * 0.035,
  medium: width * 0.04,
  large: width * 0.05,
  xlarge: width * 0.06,
};

const fontFamilies = {
  regular: 'Roboto-Regular',
  bold: 'Roboto-Bold',
  monospace: 'monospace',
};

const screen = {width, height};

// Export a function that returns the current theme colors
export const getThemeColors = (theme = 'light') => {
  return theme === 'dark' ? darkColors : lightColors;
};

// Export other constants
export const constants = {
  fontSizes,
  fontFamilies,
  screen,
};
