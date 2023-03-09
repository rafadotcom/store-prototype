import { Box, Button, FormControl, FormLabel, Heading, Input, Link, Text } from "@chakra-ui/react";
import { ThemeProvider } from "@chakra-ui/react";
import { Global, css } from "@emotion/react";
import theme from "../styles/styles";
import { useState } from "react";
import Navbar from "../components/Navbar_sign"; // importe o componente Navbar


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Email: ${email}, Password: ${password}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <Global
        styles={css`
          body {
            background-image: url('/fundo.jpg');
            background-repeat: no-repeat;
            background-position: center;
            background-size: cover;
            overflow-x: hidden;
          }
        `}
      />
      <Box
        background="rgb(1,1,1,0.6)"
        width="100%"
        height="100%"
        zIndex="100"
        >
      <Navbar />
      <Box h="100vh" d="flex" alignItems="center" justifyContent="center">
        <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
          <Box bg="#65000b" p="4">
            <Heading size="md" color="white">
              Faça o login na sua conta
            </Heading>
          </Box>
          <Box p="4">
            <form onSubmit={handleSubmit}>
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
              <Button type="submit" width="full">
                Entrar
              </Button>
            </form>
            <Text mt="4" textAlign="center">
              Não tem uma conta ainda?{" "}
              <Link color="#65000b" href="#">
                Registre-se aqui
              </Link>
            </Text>
          </Box>
        </Box></Box>
      </Box>
    </ThemeProvider>
  );
}
