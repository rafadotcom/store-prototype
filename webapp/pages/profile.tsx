import { Box, Button, Flex, FormLabel, Heading, Image, Input, InputGroup, Text, useMediaQuery } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

export default function Profile() {

    const [nome, setNome] = useState("")
    const [nif, setNif] = useState("")
    const [dataNascimento, setDataNascimento] = useState("")
    const [morada, setMorada] = useState("")
    const [telemovel, setTelemovel] = useState("")
    const [tipo, setTipo] = useState("")
    const [bolos, setBolos] = useState([]);
    const [cafes, setCafes] = useState([]);
    const [del, setDel] = useState(0)

    const [encomendas, setEncomendas] = useState([]);
    const [cancel, setCancel] = useState(0)

    const router = useRouter()
    const { status, data } = useSession()



    const [canUpdate, setCanUpdate] = useState(false)

    const email = data?.user.email

    useEffect(() => {
        fetch("https://webstore-backend-nu.vercel.app/api/getEncomendas", {
            method: "GET"
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data, "encomendas");
                setEncomendas(data.data);
            });
    }, [cancel]);

    useEffect(() => {
        fetch("https://webstore-backend-nu.vercel.app/api/getBolos", {
            method: "GET"
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data, "bolos");
                setBolos(data.data);
            });
    }, [del]);

    useEffect(() => {
        fetch("https://webstore-backend-nu.vercel.app/api/getCafes", {
            method: "GET"
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data, "cafes");
                setCafes(data.data);
            });
    }, [del]);

    useEffect(() => {
        console.log(status)
        if (status === "unauthenticated") {
            router.replace("/login")
        }
    })

    const handleDeleteBolo = async (id) => {
        await fetch("https://webstore-backend-nu.vercel.app/api/deleteBolo", {
            method: "POST",
            mode: "cors",
            body: JSON.stringify({
                _id: id
            })
        }).then((res) => {
            console.log(res)
            setDel(del + 1)
        })
    };

    const cancelEncomenda = async (id) => {
        await fetch("https://webstore-backend-nu.vercel.app/api/cancelEncomenda", {
            method: "POST",
            mode: "cors",
            body: JSON.stringify({
                id: id
            })
        }).then((res) => {
            console.log(res)
            setCancel(cancel + 1)
        })
    };

    const handleDeleteCafe = async (id) => {
        await fetch("https://webstore-backend-nu.vercel.app/api/deleteCafe", {
            method: "POST",
            mode: "cors",
            body: JSON.stringify({
                _id: id
            })
        }).then((res) => {
            console.log(res)
            setDel(del + 1)
        })
    };

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

    const showProdInfo = (lista) => {
        let final = ""
        for (let i = 0; i < lista.length; i++) {
            if (i == 0) {
                final = lista[i].name + "(Quantidade: " + lista[i].quantidade + ", Preço: " + lista[i].price + "€)"
            }
            else {
                final = final + "; " + lista[i].name + "(Quantidade: " + lista[i].quantidade + ", Preço: " + lista[i].price + "€)"
            }

        }
        return (
            <Box mt="1" fontWeight="bold" color={"black"} fontSize="20px" as="h4" lineHeight="tight" isTruncated>
                {final}
            </Box>
        )
    }

    const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
    const [isSmallerThan768] = useMediaQuery("(max-width: 767px)");

    return (
        <Flex
            w="100vw"
            minH="100vh"
            justifyContent="center"
            alignItems="center"
            backgroundImage="url('/fundo2.jpg')"
            backgroundRepeat="no-repeat"
            backgroundPosition="center"
            backgroundSize="cover"
            direction="column"
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
                    mt="120px"
                    gap="25px"
                    direction="column"
                    w={isLargerThan768 ? "70vw" : "90vw"}
                    background="rgb(0,0,0,0.5)"
                    padding={9}
                    borderRadius={20}
                >
                    <Heading color="white" marginBottom="25px">Dados de Utilizador</Heading>
                    <Flex gap="100px" direction={isSmallerThan768 ? "column" : "row"}>
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
                    <Flex gap="100px" direction={isSmallerThan768 ? "column" : "row"}>
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
                    <Flex gap="100px" direction={isSmallerThan768 ? "column" : "row"}>
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
            {tipo != "consumidor" && (bolos.length > 0 || cafes.length > 0) &&
                <Heading as="h1" size="xl" textAlign="center" m={6}>
                    Os seus produtos:
                </Heading>
            }

            <Flex flexWrap="wrap" p={isSmallerThan768 ? 2 : 6}>
                {bolos.map((product, index) => {
                    if (product.seller === email) {
                        return (
                            < Box
                                key={product.id}
                                p={3}
                                mb={4}
                                mr={4}
                                width={{ base: "40%", md: "48%", lg: "32%" }}
                                borderWidth="1px"
                                borderRadius="lg"
                                overflow="hidden"
                                bg="#faf0e6"
                            >
                                <Image
                                    src={"/bolo1.png"}
                                    alt={product.name}
                                    width="100%"
                                    height="auto"
                                    objectFit="cover"
                                    borderRadius="lg"
                                />

                                <Box mt="1" fontWeight="bold" color={"black"} fontSize="20px" as="h4" lineHeight="tight" isTruncated>
                                    {product.name}
                                </Box>

                                <Box mt="1" fontWeight="semibold" as="h4" color={"black"} lineHeight="tight" isTruncated>
                                    {product.description}
                                </Box>

                                <Box display="flex" mt="2" alignItems="center">
                                    <Text fontWeight="semibold" fontSize="30px" color="black">
                                        {product.price + "€"}
                                    </Text>
                                </Box>

                                <Box display="flex" mt="2" alignItems="center">
                                    <Text fontWeight="semibold" fontSize="30px" color="black">

                                    </Text>
                                    <Button
                                        ml="auto"
                                        bg="#deb887"
                                        onClick={() => handleDeleteBolo(product._id)}
                                    >
                                        Apagar Produto
                                    </Button>
                                </Box>
                            </Box>
                        )
                    }
                }

                )}
            </Flex>
            <Flex flexWrap="wrap" p={6}>
                {cafes.map((product, index) => {
                    if (product.seller === email) {
                        return (
                            < Box
                                key={product.id}
                                p={3}
                                mb={4}
                                mr={4}
                                width={{ base: "40%", md: "48%", lg: "32%" }}
                                borderWidth="1px"
                                borderRadius="lg"
                                overflow="hidden"
                                bg="#faf0e6"
                            >
                                <Image
                                    src={"/produto11.png"}
                                    alt={product.name}
                                    width="100%"
                                    height="auto"
                                    objectFit="cover"
                                    borderRadius="lg"
                                />

                                <Box mt="1" fontWeight="bold" color={"black"} fontSize="20px" as="h4" lineHeight="tight" isTruncated>
                                    {product.name}
                                </Box>

                                <Box mt="1" fontWeight="semibold" color={"black"} as="h4" lineHeight="tight" isTruncated>
                                    {product.description}
                                </Box>

                                <Box display="flex" mt="2" alignItems="center">
                                    <Text fontWeight="semibold" fontSize="30px" color="black">
                                        {product.price + "€"}
                                    </Text>
                                </Box>

                                <Box display="flex" mt="2" alignItems="center">
                                    <Text fontWeight="semibold" fontSize="30px" color="black">

                                    </Text>
                                    <Button
                                        ml="auto"
                                        bg="#deb887"
                                        onClick={() => handleDeleteCafe(product._id)}
                                    >
                                        Apagar Produto
                                    </Button>
                                </Box>

                            </Box>
                        )
                    }

                }

                )}
            </Flex>

            <Heading as="h1" size="xl" textAlign="center" m={6}>
                As suas encomendas:
            </Heading>

            {encomendas.map((encomenda, index) => {
                if (encomenda.comprador === email && encomenda.estado === "pago") {
                    return (
                        < Box
                            key={encomenda.id}
                            p={3}
                            mb={4}
                            mr={4}
                            width={{ base: "90%", md: "90%", lg: "90%%" }}
                            borderWidth="1px"
                            borderRadius="lg"
                            overflow="hidden"
                            bg="#faf0e6"
                        >

                            <Box mt="1" fontWeight="bold" color={"black"} fontSize="20px" as="h4" lineHeight="tight" isTruncated>
                                {"ID: " + encomenda._id}
                            </Box>

                            {showProdInfo(encomenda.produtos)}

                            <Box mt="1" fontWeight="semibold" color={"black"} as="h4" lineHeight="tight" isTruncated>
                                {"Entregar em: " + encomenda.morada}
                            </Box>

                            <Box mt="1" fontWeight="semibold" color={"black"} as="h4" lineHeight="tight" isTruncated>
                                {"Preço total: " + encomenda.preco}
                            </Box>

                            <Box display="flex" mt="2" alignItems="center">
                                <Text fontWeight="semibold" fontSize="30px" color="black">

                                </Text>
                                <Button
                                    ml="auto"
                                    bg="#deb887"
                                    onClick={() => cancelEncomenda(encomenda._id)}
                                >
                                    Cancelar
                                </Button>
                            </Box>
                        </Box>
                    )
                }
            }
            )}
        </Flex >
    );
}