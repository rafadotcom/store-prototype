import { Box, Button, Heading, Link, Text, Flex } from "@chakra-ui/react";
import { ThemeProvider } from "@chakra-ui/react";
import theme from "../styles/styles";
import Navbar from "../components/Navbar";


export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        backgroundImage="url('/fundo.jpg')"
        backgroundRepeat="no-repeat"
        backgroundPosition="center"
        backgroundSize="cover"
        height="100vh"
        overflowX="hidden"
      >
        <Box
        background="rgb(1,1,1,0.3)"
        width="100%"
        height="100%"
        zIndex="100"
        >
        <Navbar />
        
      </Box></Box>
    </ThemeProvider>
  );
}
