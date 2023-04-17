import { Box, Button, FormControl, FormLabel, Heading, Input, Link, Text, InputGroup } from "@chakra-ui/react";
import { ThemeProvider } from "@chakra-ui/react";
import { Global, css } from "@emotion/react";
import theme from "../styles/styles";
import { useState } from "react";
import Navbar from "../components/Navbar_sign";

export default function Login() {
  

  // rest of the component

  return (
    <ThemeProvider theme={theme}>
      <Global
        styles={css`
          body {
            background-image: url('/fundo2.jpg');
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
            overflow-x: hidden;
          }
        `}
      />
      <Box
        background="rgb(1,1,1,0.3)"
        width="100%"
        height="100%"
        zIndex="100"
      >
        <Navbar />
        <Box h="100vh" display="flex" alignItems="center" justifyContent="center">
          <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Box bg="#8A624A" p="4">
              <Heading size="md" color="white">
                Insira os seus dados
              </Heading>
            </Box>
            <Box p="4">
              <form action="/api/getBolos" method="get">

                <InputGroup mb="4">
                  <FormLabel color="white">Email</FormLabel>
                  <Input
                    type="email"
                    placeholder="Seu email"
                    name="email"
                    color="white"
                  />
                </InputGroup>

                <InputGroup mb="4">
                  <FormLabel color="white">Senha</FormLabel>
                  <Input
                    type="password"
                    placeholder="Sua senha"
                    name="password"
                    color="white"
                  />
                </InputGroup>                
                <Button type="submit" width="full">
                  Entrar
                </Button>

              </form>
              <Text mt="4" textAlign="center">
                Não tem uma conta ainda?{" "}
                <Link color="#8A624A" href="#">
                  Registre-se aqui
                </Link>
              </Text>
            </Box>
          </Box></Box>
      </Box>
    </ThemeProvider>
  );
}
