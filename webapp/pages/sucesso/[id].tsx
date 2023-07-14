import { CheckIcon } from '@chakra-ui/icons';
import { Box, Flex, Heading } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Navbar from "../../components/Navbar";

export default function Sucesso() {

    const router = useRouter()
    const { status, data } = useSession()

    const id = router.query.id

    useEffect(() => {
        fetch("https://webstore-backend-nu.vercel.app/api/updateEncomenda", {
            method: "POST",
            mode: "cors",
            body: JSON.stringify({
                id: id
            })
        })
            .then((res) => {
                if (res.ok) {
                    setTimeout(function () { router.push("/") }, 3000)
                }
            })
    })



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
                    <Heading color="white" marginBottom="0px" marginRight={"19px"}>Encomenda Realizada com Sucesso!</Heading>
                    <CheckIcon boxSize={50} color="green" marginRight="25px" />
                </Flex>
            </Flex>
        </Flex>
    );
}