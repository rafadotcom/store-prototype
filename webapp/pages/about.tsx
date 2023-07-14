import { Box, Button, Heading, Text, ThemeProvider, useBreakpointValue } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import theme from "../styles/styles";

export default function About() {
  const router = useRouter();
  const { status, data } = useSession();

  useEffect(() => {
    console.log(status);
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  });

  const buttonSize = useBreakpointValue({ base: "md", md: "lg" });
  const headingSize = useBreakpointValue({ base: "3xl", md: "5xl" });
  const textSize = useBreakpointValue({ base: "lg", md: "xl" });

  return (
    <ThemeProvider theme={theme}>
      <Box
        backgroundImage="url('/fundo2.jpg')"
        backgroundRepeat="no-repeat"
        backgroundPosition="center"
        backgroundSize="cover"
        height="100vh"
        overflowX="hidden"
      >
        <Navbar />
        <Box
          backgroundSize="cover"
          width="100%"
          
          zIndex="100"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          padding="5rem"
          
        >
          <Heading color="white" fontSize={headingSize} mb="4" >
            Bem-vindo ao Café Dream Drink!
          </Heading>
          <Text color="white" fontSize={textSize} mb="8">
            O lugar onde os sonhos se tornam realidade!
          </Text>
          <Text color="white" fontSize={textSize} mb="8">
            Se procura um café acolhedor e confortável para desfrutar de uma bebida especial e um delicioso bolinho,
            encontrou o local certo.
          </Text>
          <Text color="white" fontSize={textSize} mb="8">
            Oferecemos uma ampla variedade de bebidas quentes e frias, mas o nosso destaque é a nossa Dream Drink - uma
            bebida exclusiva que não encontrará em nenhum outro lugar. Feita com ingredientes cuidadosamente selecionados,
            a nossa Dream Drink é uma mistura única de sabores que o transportará para um mundo de sonhos.
          </Text>
          <Text color="white" fontSize={textSize} mb="8">
            E o que seria de uma bebida deliciosa sem um bom acompanhamento? Temos disponíveis deliciosos bolinhos que
            complementam na perfeição a sua bebida. Venha visitar-nos e experimentar as nossas especialidades. Estamos
            ansiosos para lhe proporcionar uma experiência única e memorável.
          </Text>
          <Button colorScheme="orange" size={buttonSize} mt="8">
            Visite-nos agora!
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

