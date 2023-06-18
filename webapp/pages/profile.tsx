import { Box, Button, Heading, Text, ThemeProvider, Flex, FormLabel, Input, InputGroup, background } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import theme from "../styles/styles";
import Email from "next-auth/providers/email";

export default function Profile() {

    const [nome, setNome] = useState("")
    const [nif, setNif] = useState("")
    const [dataNascimento, setDataNascimento] = useState("")
    const [morada, setMorada] = useState("")
    const [telemovel, setTelemovel] = useState("")
    const [tipo, setTipo] = useState("")

    const router = useRouter()
    const { status, data } = useSession()

    const [canUpdate, setCanUpdate] = useState(false)

    const email = data?.user.email

    useEffect(() => {
        console.log(status)
        if (status === "unauthenticated") {
            router.replace("/login")
        }
    })

    const [userInfo, setUserInfo] = useState({ nome: nome, email: email, NIF: nif, dataNascimento: dataNascimento, morada: morada, telemovel: telemovel, tipo: tipo });

    useEffect(() => {
        fetch("https://webstore-backend-nu.vercel.app/api/getUsers")
            .then((response) => response.json())
            .then((data) => {
                data.data.forEach(user => {
                    if (user.email == email) {
                        setNome(user.nome)
                        setNif(user.NIF)
                        setDataNascimento(user.dataNascimento)
                        setMorada(user.morada)
                        setTelemovel(user.telemovel)
                        setTipo(user.tipo)
                    }
                });
            });
    })



    const handleChange = (event) => {
        if (!canUpdate) {
            setCanUpdate(true)
        }

        setUserInfo({
            ...userInfo,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = async () => {
        console.log("aqui")
        await fetch("https://webstore-backend-nu.vercel.app/api/updateUser", {
            method: "POST",
            mode: "cors",
            body: JSON.stringify({
                email: email,
                nome: userInfo.nome,
                dataNascimento: userInfo.dataNascimento,
                morada: userInfo.morada,
                telemovel: userInfo.telemovel
            })
        }).then((res) => console.log(res))

    }

    return (
        <Flex
            w="100vw"
            h="100vh"
            justifyContent="center"
            alignItems="center"
            backgroundImage="url('/fundo2.jpg')"
            backgroundRepeat="no-repeat"
            backgroundPosition="center"
            backgroundSize="cover"
        >
            <Box
                position="absolute"
                top="0"
                w="100%"
            >
                <Navbar />
            </Box>
            <form onSubmit={handleSubmit}>
                <Flex
                    gap="25px"
                    direction="column"
                    w="70vw"
                    background="rgb(0,0,0,0.5)"
                    padding={9}
                    borderRadius={20}
                >
                    <Heading color="white" marginBottom="25px">Dados de Utilizador</Heading>
                    <Flex gap="100px">
                        <InputGroup mb="4">
                            <FormLabel color="white">Nome</FormLabel>
                            <Input
                                placeholder="Nome"
                                name="nome"
                                defaultValue={nome}
                                color="white"
                                onChange={handleChange}
                            />
                        </InputGroup>

                        <InputGroup mb="4">
                            <FormLabel color="white">Email</FormLabel>
                            <Input
                                disabled={true}
                                type="email"
                                placeholder="Email"
                                name="email"
                                color="white"
                                defaultValue={email}
                            />
                        </InputGroup>


                    </Flex>
                    <Flex gap="100px">
                        <InputGroup mb="4">
                            <FormLabel color="white">NIF</FormLabel>
                            <Input
                                disabled={true}
                                type="nif"
                                placeholder="NIF"
                                name="NIF"
                                color="white"
                                defaultValue={nif}
                            />
                        </InputGroup>
                        <InputGroup mb="4">
                            <FormLabel color="white">Data de Nascimento</FormLabel>
                            <Input
                                type="date"
                                placeholder="dataNasciemnto"
                                name="dataNascimento"
                                color="white"
                                defaultValue={dataNascimento}
                                onChange={handleChange}
                            />
                        </InputGroup>

                    </Flex>
                    <Flex gap="100px">
                        <InputGroup mb="4">
                            <FormLabel color="white">Morada</FormLabel>
                            <Input
                                type="morada"
                                placeholder="Morada"
                                name="morada"
                                defaultValue={morada}
                                color="white"
                                onChange={handleChange}
                            />
                        </InputGroup>

                        <InputGroup mb="4">
                            <FormLabel color="white">Telemovel</FormLabel>
                            <Input
                                type="tel"
                                placeholder="Telemovel"
                                name="telemovel"
                                defaultValue={telemovel}
                                color="white"
                                onChange={handleChange}
                            />
                        </InputGroup>


                    </Flex>
                    <Flex>
                        <InputGroup mb="4">
                            <FormLabel color="white">Tipo de Conta</FormLabel>
                            <Input
                                disabled={true}
                                type="tipo"
                                placeholder="Tipo de Conta"
                                name="tipo"
                                defaultValue={tipo}
                                color="white"
                            />
                        </InputGroup>
                        <Flex w="full" justifyContent="end">

                            <Button
                                type={canUpdate ? "submit" : "button"}
                                width="20%"
                                background={canUpdate ? "green" : "gray"}
                                _hover={{
                                    background: canUpdate ? "lightGreen" : "gray",
                                }}
                            >
                                Guardar
                            </Button>
                        </Flex>
                    </Flex>
                </Flex>


            </form >
        </Flex >
    );
}
