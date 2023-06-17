import { Box, Button, Heading, Text, ThemeProvider, Link }  from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import theme from "../styles/styles";


export default function Home() {

  const router = useRouter()
  const { status, data } = useSession()
  useEffect(() => {
    console.log(status)
    if (status === "unauthenticated") {
      router.replace("/login")
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <Box
        backgroundImage="url('/fundo2.jpg')"
        backgroundRepeat="no-repeat"
        backgroundPosition="center"
        backgroundSize="cover"
        height="100vh"
        overflowX="hidden"
      > <Navbar />
        <Box
          background="rgb(1,1,1,0.3)"
          width="100%"
          height="100%"
          zIndex="100"
        >

          <Heading color="white" fontSize="5xl" mb="4">
              Efetue aqui as suas encomendas!
          </Heading>

          <Text color="white" fontSize="xl" mb="8">
            Clique no botão abaixo para escolher os produtos que deseja encomendar!
          </Text>

          <Link href="/produto">
                      <Button
                        position="absolute"
                        bottom={0}
                        left={0}
                        right={0}
                        mx="auto"
                        mb={4}
                      >
                        Escolher produtos!
                      </Button>
                    </Link> 


            <Button colorScheme="green" size="lg" mt="8">
              Escolher produtos! {/*    redirecionar p produtos */}
            </Button>

            {/* depois de escolher os produtos, volta p página das encomendas
            onde terá a lista de produtos escolhidos e pode ou cancelar ou
            prosseguir p cesto*/}

            <Button colorScheme="orange" size="lg" mt="8">
              Efetuar encomenda!  {/*redirecionar p cesto */}
            </Button>

            <Link href="/home">
                      <Button
                        position="absolute"
                        bottom={0}
                        left={0}
                        right={0}
                        mx="auto"
                        mb={4}
                      >
                        Cancelar
                      </Button>
                    </Link> 
      </Box>
      
      </Box>

    </ThemeProvider>
  );
}
