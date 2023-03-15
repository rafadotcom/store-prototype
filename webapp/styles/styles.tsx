import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundImage: "url('/background.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
        overflowX: "hidden"
      }
    }
  },
  components: {
    FormControl: {
      baseStyle: {
        bg: "rgba(255, 255, 255, 0.9)",
        borderRadius: "md",
        p: 4
      }
    },
    FormLabel: {
      baseStyle: {
        fontSize: "md",
        fontWeight: "bold",
        color: "white",
        mb: 2
      }
    },
    Input: {
      baseStyle: {
        borderRadius: "md",
        _focus: {
          boxShadow: "none",
          borderColor: "white"
        }
      }
    },
    Button: {
      baseStyle: {
        borderRadius: "md",
        fontWeight: "bold",
        bg: "white",
        color: "black",
        _hover: {
          bg: "white"
        }
      }
    },
    Text: {
      baseStyle: {
        fontSize: "sm",
        color: "white"
      }
    }
  }
});

export default theme;
