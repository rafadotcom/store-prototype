import { Box, Button, FormLabel, Heading, Input, InputGroup, Link, Select, Text, ThemeProvider } from "@chakra-ui/react";
import { Global, css } from "@emotion/react";
import { useRouter } from "next/router";
import { useState } from "react";
import Navbar from "../components/Navbar_sign";
import theme from "../styles/styles";

export default function Login() {

  const router = useRouter()

  const [userInfo, setUserInfo] = useState({ nome: "", email: "", password: "", NIF: "", dataNascimento: "", morada: "", telemovel: "", tipo: "" });

  const handleSubmit = async (event) => {
    event.preventDefault()
    await fetch("https://webstore-backend-nu.vercel.app/api/addUser", {
      method: "POST",
      mode: "cors",
      body: JSON.stringify({
        nome: userInfo.nome,
        email: userInfo.email,
        password: userInfo.password,
        NIF: userInfo.NIF,
        dataNascimento: userInfo.dataNascimento,
        telemovel: userInfo.telemovel,
        morada: userInfo.morada,
        tipo: userInfo.tipo
      })
    }).then((res) => {
      console.log(res.ok)
      if (res.ok) {
        router.push("/login")
      }
    })
  };

  const handleChange = (event) => {
    setUserInfo({
      ...userInfo,
      [event.target.name]: event.target.value
    });
  };


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
              <iframe name="dummyframe" id="dummyframe" style={{ display: "none" }}></iframe>
              <form onSubmit={handleSubmit}>

                <InputGroup mb="4">
                  <FormLabel color="white">Nome</FormLabel>
                  <Input
                    type="nome"
                    placeholder="nome"
                    name="nome"
                    color="white"
                    value={userInfo.nome}
                    onChange={handleChange}
                  />
                </InputGroup>

                <InputGroup mb="4">
                  <FormLabel color="white">Email</FormLabel>
                  <Input
                    type="email"
                    placeholder="Seu email"
                    name="email"
                    color="white"
                    value={userInfo.email}
                    onChange={handleChange}
                  />
                </InputGroup>

                <InputGroup mb="4">
                  <FormLabel color="white">Senha</FormLabel>
                  <Input
                    type="password"
                    placeholder="Sua senha"
                    name="password"
                    color="white"
                    value={userInfo.password}
                    onChange={handleChange}
                  />
                </InputGroup>

                <InputGroup mb="4">
                  <FormLabel color="white">NIF</FormLabel>
                  <Input
                    type="nif"
                    placeholder="nif"
                    name="NIF"
                    color="white"
                    value={userInfo.NIF}
                    onChange={handleChange}
                  />
                </InputGroup>

                <InputGroup mb="4">
                  <FormLabel color="white">Data de Nascimento</FormLabel>
                  <Input
                    type="date"
                    placeholder="dataNasciemnto"
                    name="dataNascimento"
                    color="white"
                    value={userInfo.dataNascimento}
                    onChange={handleChange}
                  />
                </InputGroup>

                <InputGroup mb="4">
                  <FormLabel color="white">Morada</FormLabel>
                  <Input
                    type="morada"
                    placeholder="morada"
                    name="morada"
                    color="white"
                    value={userInfo.morada}
                    onChange={handleChange}
                  />
                </InputGroup>

                <InputGroup mb="4">
                  <FormLabel>Telemovel</FormLabel>
                  <Input
                    type="tel"
                    placeholder="telemovel"
                    name="telemovel"
                    color="white"
                    value={userInfo.telemovel}
                    onChange={handleChange}
                  />
                </InputGroup>

                <InputGroup mb="4">
                  <FormLabel color="white">Tipo de Conta</FormLabel>
                  <Select
                    placeholder='Selecione o tipo de conta'
                    name="tipo"
                    value={userInfo.tipo}
                    onChange={handleChange}
                  >
                    <option value='consumidor'>Consumidor</option>
                    <option value='vendedor'>Vendedor</option>
                  </Select>
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
    </ThemeProvider >
  );
}