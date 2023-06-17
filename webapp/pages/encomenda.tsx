/* eslint-disable @next/next/no-img-element */
import { Box, Button, Heading, Text, ThemeProvider, Link}  from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import theme from "../styles/styles";
import mb_pp from '../public/mb_pp.png'



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
          background="rgb(1,1,1,0.4)"
          width="100%"
          height="100%"
          zIndex="100"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          padding="5rem"
        >

          <Heading color="white" fontSize="5xl" mb="4">
            Termine a sua encomenda!
          </Heading>

          <Text color="white" fontSize="xl" mb="8">
            Preencha as informações abaixo para prosseguir com a sua encomenda!
          </Text>
          
          <Text color="white" fontSize="xl" mb="8">
          Selecione o seu meio de pagamento: 
          </Text>

          <Box
          background="rgb(80,80,80,0.5)"
          width="20%"
          height="10%"
          zIndex="100"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          padding="5rem"
          > 
          <div   className = "pagamento">
          <input type = "checkbox" id = "paga" name = "paypal" />  Paypal <br></br>
          <input type = "checkbox" id = "paga" name = "mbway"  />  MbWay <br></br>
          <input type = "checkbox" id = "paga" name = "multibanco" />  Multibanco <br></br>
          <img src={mb_pp.toString()} />
          </div>
          </Box>

          <br></br>

          <Text color="white" fontSize="xl" mb="8">
            Resumo de encomenda: 
          </Text>



            <Button colorScheme="green" size="lg" mt="8">
              Efetuar encomenda! {/*    redirecionar p produtos */}
            </Button>

            {/* depois de escolher os produtos, volta p página das encomendas
            onde terá a lista de produtos escolhidos e pode ou cancelar ou
            prosseguir p cesto*/}

            <Button colorScheme="red" size="lg" mt="8">
              Cancelar encomenda!  {/*redirecionar p página inicial */}
            </Button>

          

      </Box>
      
      </Box>

    </ThemeProvider>
  );
}
