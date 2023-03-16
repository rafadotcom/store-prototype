import { Box, Button, FormControl, FormLabel, Heading, Input, Link, Text } from "@chakra-ui/react";
import { ThemeProvider } from "@chakra-ui/react";
import { Global, css } from "@emotion/react";
import theme from "../styles/styles";
import { FormEvent, useState } from "react";
import Navbar from "../components/Navbar_sign"; // importe o componente Navbar


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const [nif, setNIF] = useState("");
  const [telemovel, setTelemovel] = useState("");
  const [morada, setMorada] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");

  const handleSubmit = (event:FormEvent) => {
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
      <Box h="100vh" display="flex" alignItems="center" justifyContent="center">
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
              <FormControl id="nome" mb="4">
                <FormLabel>Nome</FormLabel>
                <Input
                  type="nome"
                  placeholder="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </FormControl>
              <FormControl id="nif" mb="4">
                <FormLabel>NIF</FormLabel>
                <Input
                  type="nif"
                  placeholder="nif"
                  value={nif}
                  onChange={(e) => setNIF(e.target.value)}
                />
              </FormControl>
              <FormControl id="dataNascimento" mb="4">
                <FormLabel>Data de Nascimento</FormLabel>
                <Input
                  type="dataNascimento"
                  placeholder="dataNasciemnto"
                  value={dataNascimento}
                  onChange={(e) => setDataNascimento(e.target.value)}
                />
              </FormControl>
              <FormControl id="morada" mb="4">
                <FormLabel>Morada</FormLabel>
                <Input
                  type="morada"
                  placeholder="morada"
                  value={morada}
                  onChange={(e) => setMorada(e.target.value)}
                />
              </FormControl>
              <FormControl id="telemovel" mb="4">
                <FormLabel>Telemovel</FormLabel>
                <Input
                  type="telemovel"
                  placeholder="telemovel"
                  value={telemovel}
                  onChange={(e) => setTelemovel(e.target.value)}
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
