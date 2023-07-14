import { CloseIcon } from '@chakra-ui/icons';
import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";

export default function SemSuceso() {
    const router = useRouter()
    const { status, data } = useSession()

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
            <Flex
                gap="25px"
                direction="column"
                w="70vw"
                background="rgb(0,0,0,0.5)"
                padding={9}
                borderRadius={20}
            >
                <Flex align="space-between">
                    <Heading color="white" marginBottom="0px" marginRight={"19px"}>Encomenda Realizada sem Sucesso!</Heading>
                    <CloseIcon boxSize={50} color="red" marginRight="25px" />
                    <Button onClick={() => router.push('/cesto')}>Ir para o cesto</Button>
                </Flex>
            </Flex>
        </Flex>
    );
}