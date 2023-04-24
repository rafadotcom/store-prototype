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
                Faça o seu registo
              </Heading>
            </Box>
            <Box p="4">
              <form action="/api/register" method="post">

                <InputGroup mb="4">
                  <FormLabel color="white">Nome</FormLabel>
                  <Input
                    type="nome"
                    placeholder="nome"
                    name="nome"
                    color="white"
                  />
                </InputGroup>

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

                <InputGroup mb="4">
                  <FormLabel color="white">NIF</FormLabel>
                  <Input
                    type="nif"
                    placeholder="nif"
                    name="NIF"
                    color="white"
                  />
                </InputGroup>

                <InputGroup mb="4">
                  <FormLabel color="white">Data de Nascimento</FormLabel>
                  <Input
                    type="date"
                    placeholder="dataNasciemnto"
                    name="dataNascimento"
                    color="white"
                  />
                </InputGroup>

                <InputGroup mb="4">
                  <FormLabel color="white">Morada</FormLabel>
                  <Input
                    type="morada"
                    placeholder="morada"
                    name="morada"
                    color="white"
                  />
                </InputGroup>

                <InputGroup mb="4">
                  <FormLabel>Telemovel</FormLabel>
                  <Input
                    type="tel"
                    placeholder="telemovel"
                    name="telemovel"
                    color="white"
                  />
                </InputGroup>

                <InputGroup mb="4">
                  <FormLabel color="white">Fornecedor ou Consumidor</FormLabel>
                  <Input
                    type="tipo"
                    placeholder="fornecedor ou consumidor"
                    name="tipo"
                    color="white"
                  />
                </InputGroup>


                <Button type="submit" width="full">
                  Registar
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
