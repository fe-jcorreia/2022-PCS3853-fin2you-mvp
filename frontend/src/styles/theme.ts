import { extendTheme } from "@chakra-ui/react";

const Link = {
  baseStyle: {
    _hover: {
      textDecoration: "none",
      color: "blue.500",
      transition: "0.2s",
    },
  },
};

export const theme = extendTheme({
  colors: {
    blue: {
      "900": "#032a51",
      "800": "#053a6b",
      "700": "#074584",
      "600": "#0b5299",
      "500": "#0f65ba",
      "400": "#1f7dc9",
      "300": "#3392d3",
      "200": "#48ades",
      "100": "#60c3efv",
      "50": "#ebf8ff",
    },
    yellow: {
      "900": "#9b4d00",
      "800": "#b26100",
      "700": "#c97200",
      "600": "#ed8c00",
      "500": "#f9a806",
      "400": "#ffbe1d",
      "300": "#ffd243",
      "200": "#ffe164",
      "100": "#ffed80",
      "50": "#fffff0",
    },
  },
  fonts: {
    heading: "Montserrat",
    body: "Montserrat",
  },
  styles: {
    global: {
      body: {
        bg: "white",
        color: "blue.900",
      },
    },
  },
  components: {
    Link,
  },
});
