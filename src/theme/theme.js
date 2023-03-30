import { extendTheme } from "@chakra-ui/react";

const theme = {

  config:{
     initialColorMode: 'dark',
    useSystemColorMode: true,
  },
  fonts: {
    heading: `'Open Sans', sans-serif`,
    body: `'Raleway', sans-serif`,
    button:`'cursive'`
  },
  styles:{
    global:{
      body: {
        "margin": 0,
        "font-family": "monospace",
        "-webkit-font-smoothing": "antialiased",
        "-moz-osx-font-smoothing": "grayscale",
      },

      code: {
        "font-family": "sans-serif",
      }
    }
  }
}

export default extendTheme(theme)