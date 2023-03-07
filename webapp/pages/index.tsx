import { Box, Button, Heading, Link, Text, Flex } from "@chakra-ui/react";
import { ThemeProvider } from "@chakra-ui/react";
import theme from "../styles/styles";
import Navbar from "../components/Navbar";


export default function Home() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        backgroundImage="url('/cuca.jpg')"
        backgroundRepeat="no-repeat"
        backgroundPosition="center"
        backgroundSize="cover"
        height="100vh"
        overflowX="hidden"
      >
        <Navbar />
        
      </Box>
    </ThemeProvider>
  );
}
