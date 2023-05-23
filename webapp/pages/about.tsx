import { Box, Button, Heading, Link, Text, Flex, Image } from "@chakra-ui/react";
import { ThemeProvider } from "@chakra-ui/react";
import theme from "../styles/styles";
import Navbar from "../components/Navbar";

export default function About() {
  return (
    <ThemeProvider theme={theme}>
      <Box
        backgroundImage="url('/fundo2.jpg')"
        backgroundRepeat="no-repeat"
        backgroundPosition="center"
        backgroundSize="cover"
        height="100vh"
        overflowX="hidden"
      > <Navbar />
        <Box
          backgroundSize="cover"
          width="100%"
          height="100%"
          zIndex="100"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          padding="5rem"
        >
  
      
          <Heading color="white" fontSize="5xl" mb="4">
            Bem-vindo ao Café Dream Drink!
          </Heading>
          <Text color="white" fontSize="xl" mb="8">
            O lugar onde os sonhos se tornam realidade!
          </Text>
          <Text color="white" fontSize="lg" mb="8">
            Se procura um café acolhedor e confortável para desfrutar de uma bebida especial e um delicioso bolinho, encontrou o local certo.
          </Text>
          <Text color="white" fontSize="lg" mb="8">
            Oferecemos uma ampla variedade de bebidas quentes e frias, mas o nosso destaque é a nossa &quot;Dream Drink&quot; - uma bebida exclusiva que não encontrará em nenhum outro lugar. Feita com ingredientes cuidadosamente selecionados, a nossa Dream Drink é uma mistura única de sabores que o transportará para um mundo de sonhos.
          </Text>
          <Text color="white" fontSize="lg" mb="8">
            E o que seria de uma bebida deliciosa sem um bom acompanhamento? Temos disponíveis deliciosos bolinhos que complementam na perfeição a sua bebida. Venha visitar-nos e experimentar as nossas especialidades. Estamos ansiosos para lhe proporcionar uma experiência única e memorável.
          </Text>
          <Button colorScheme="orange" size="lg" mt="8">
            Visite-nos agora!
          </Button>
        </Box>
        
      </Box>
    </ThemeProvider>
  );
}
