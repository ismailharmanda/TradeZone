export const theme = {
  radius: 8,
  text: {
    fontFamily: 'Silka, sans-serif',
    size: {
      xl: {
        fontSize: 28,
        lineHeight: 33.6,
      },
      lg: {
        fontSize: 20,
        lineHeight: 21,
      },
      md: {
        fontSize: 16,
        lineHeight: 21,
      },
      sm: {
        fontSize: 14,
        lineHeight: 16.8,
      },
      xs: {
        fontSize: 12,
        lineHeight: 14.4,
      },
    },
  },
  colors: {
    base: {
      transparent: 'rgba(255, 255, 255, 0)',
      black: '#000000',
      white: '#ffffff',
    },
    primary: {
      regular: '#F27919',
    },
    secondary: {
      regular: '#F0EDF6',
    },
    tertiary: {
      regular: '#006E5E',
    },
    success: {
      regular: '#006E5E',
    },
  },
  shadow: {
    elevation1: {
      shadowColor: 'rgba(0, 0, 0, 1)',
      shadowOffset: {
        width: 3,
        height: 3,
      },
      shadowOpacity: 0.1,
      shadowRadius: 10,
    },
    elevation2: {
      shadowColor: 'rgba(0, 0, 0, 1)',
      shadowOffset: {
        width: 3,
        height: 3,
      },
      shadowOpacity: 0.3,
      shadowRadius: 10,
    },
    elevation3: {
      shadowColor: 'rgba(0, 0, 0, 0.05)',
      shadowOffset: {
        width: 0,
        height: 4,
        blur: 4,
      },
      shadowRadius: 7,
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    screenHorizontalPadding: 16,
    screenVerticalPadding: 24,
  },
};
