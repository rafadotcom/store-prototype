import { FormEvent, useState } from "react";
import connect from "../db/Connection";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
  ThemeProvider,
} from "@chakra-ui/react";
import { Global, css } from "@emotion/react";
import theme from "../styles/styles";
import Navbar from "../components/Navbar_sign";
import NextLink from "next/link";

connect(); // Call connect() to connect to MongoDB

export default function Registo() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmePassword, setConfirmePassword] = useState("");

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
                Faça login na sua conta
              </Heading>
            </Box>
            <Box p="4">
              <form>
                <FormControl id="nome" mb="4">
                  <FormLabel>Nome</FormLabel>
                  <Input
                    type="text"
                    placeholder="Seu nome"
                    value={nome}
                    color="white"
                  />
                </FormControl>
                <FormControl id="email" mb="4">
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    placeholder="Seu email"
                    value={email}
                    color="white"
                  />
                </FormControl>
                <FormControl id="password" mb="4">
                  <FormLabel>Senha</FormLabel>
                  <Input
                    type="password"
                    placeholder="Sua senha"
                    value={password}
                    color="white"
                  />
                </FormControl>
                <FormControl id="confirmePassword" mb="4">
                  <FormLabel>Confirme a Senha</FormLabel>
                  <Input
                    type="password"
                    placeholder="Confirme sua senha"
                    value={confirmePassword}
                    color="white"
                  />
                </FormControl>
                <Button type="submit" width="full">
                  Registar
                </Button>
              </form>
              <Text mt="4" textAlign="center">
                Já tem uma conta?{" "}
                <Link as={NextLink} href="/login" color="#8A624A" passHref>
                  Faça o login aqui
                </Link>
              </Text>
            </Box>
          </Box></Box>
      </Box>
    </ThemeProvider>
  );
}