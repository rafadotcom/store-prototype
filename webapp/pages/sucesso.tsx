import { Box, Button, Icon, Heading, Text, ThemeProvider, Flex, FormLabel, Input, InputGroup, background } from "@chakra-ui/react";
import { CheckIcon } from '@chakra-ui/icons';
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import theme from "../styles/styles";
import Email from "next-auth/providers/email";

export default function Sucesso(){

    const router = useRouter()
    const {status,data} = useSession()

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
                <CheckIcon boxSize={50} color="green" marginRight="25px"/>
                <Button onClick={() => router.push('/encomenda')}>Ir para as encomendas</Button>
                </Flex>
                </Flex>
        </Flex>
    );
}