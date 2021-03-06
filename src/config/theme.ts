import { extendTheme, ThemeConfig, theme } from '@chakra-ui/react';

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false
};

const customTheme = extendTheme({
  config,
  fonts: {
    heading: 'Poppins',
    body: 'Poppins'
  },
  colors: {
    gray: {
      50: '#EFEFF6',
      100: '#D4D2E5',
      200: '#B8B5D4',
      300: '#9C98C3',
      400: '#807BB2',
      500: '#645EA1',
      600: '#504B81',
      700: '#3C3960',
      800: '#24223A',
      900: '#141320'
    },
    brand: {
      50: '#D8F5FE',
      100: '#B0EAFC',
      200: '#88e0fb',
      300: '#61d8fb',
      400: '#38cdfa',
      500: '#10c3f9',
      600: '#06a9db',
      700: '#058AB3',
      800: '#046c8b',
      900: '#034D63'
    },
    blue: {
      50: '#EBF5FE',
      100: '#C4E1FD',
      200: '#9dcefb',
      300: '#77baf9',
      400: '#51a9f6',
      500: '#2a96f4',
      600: '#0c82e9',
      700: '#0a6cc2',
      800: '#08569b',
      900: '#064174'
    },
    purple: {
      50: '#ECF0FE',
      100: '#C5D3FC',
      200: '#9EB5FA',
      300: '#7797f8',
      400: '#517BF6',
      500: '#2a56f4',
      600: '#0c3ce9',
      700: '#0A32C2',
      800: '#08289B',
      900: '#061E74'
    }
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'bold',
        borderRadius: theme.radii['2xl']
      },
      variants: {
        gradient: {
          bgGradient: 'linear(to-r, blue.400, purple.400)'
        }
      }
    }
  }
});

export default customTheme;
