import { extendTheme } from "@chakra-ui/react";

const reputableTheme = extendTheme({
  colors: {
    primary: {
      100: "#F2F0FF",
      200: "#D5D0FF",
      300: "#B8B0FF",
      400: "#9B90FF",
      500: "#796CF6",
      600: "#4639C3",
      700: "#211590",
      800: "#09005D",
    },
    secondary: {
      100: "#FF8A84",
    },
  },
});

export default reputableTheme;
