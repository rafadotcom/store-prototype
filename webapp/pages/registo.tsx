import { FormEvent, useState } from "react";
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
import Navbar from "../components/Navbar";
import NextLink from "next/link";

export default function Registo() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmePassword, setConfirmePassword] = useState("");

  const handleSubmit = (event:FormEvent) => {
    event.preventDefault();
    console.log(`Nome: ${nome}, Email: ${email}, Password: ${password}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <Global
        styles={css`
          body {
            background-image: url('/cuca.jpg');
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
            overflow-x: hidden;
          }
        `}
      />
      <Navbar />
      <Box h="100vh" display="flex" alignItems="center" justifyContent="center">
        <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
          <Box bg="#8B4000" p="4">
            <Heading size="md" color="white">
              Registe-se na sua conta
            </Heading>
          </Box>
          <Box p="4">
            <form onSubmit={handleSubmit}>
              <FormControl id="nome" mb="4">
                <FormLabel>Nome</FormLabel>
                <Input
                  type="text"
                  placeholder="Seu nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </FormControl>
              <FormControl id="email" mb="4">
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  placeholder="Seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormControl>
              <FormControl id="password" mb="4">
                <FormLabel>Senha</FormLabel>
                <Input
                  type="password"
                  placeholder="Sua senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormControl>
              <FormControl id="confirmePassword" mb="4">
                <FormLabel>Confirme a Senha</FormLabel>
                <Input
                  type="password"
                  placeholder="Confirme sua senha"
                  value={confirmePassword}
                  onChange={(e) => setConfirmePassword(e.target.value)}
                />
              </FormControl>
              <Button type="submit" width="full">
                Registar
              </Button>
            </form>
            <Text mt="4" textAlign="center">
              J?? tem uma conta?{" "}
              <NextLink href="/login" passHref>
                <Link color="#8B4000" href="#">
                  Fa??a o login aqui
                </Link>
              </NextLink>
            </Text>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
