/* eslint-disable @next/next/no-img-element */
import { Box, Button, Heading, Text, ThemeProvider, Image, Link}  from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import theme from "../styles/styles";
import mb_pp from '../public/mb_pp.png'
import Popup from 'reactjs-popup';



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
            Preencha as informações abaixo e confirme os seus produtos! <br></br>
            Seleciona o seu meio de pagamento!
          </Text>

          <Box
          background="rgb(80,80,80,0.5)"
          width="25%"
          height="8%"
          zIndex="100"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          padding="5rem"
          borderRadius="lg"
          textColor={"white"}
          borderStyle="dotted"
          > 
          <div className="pagamento">
            <input type="radio" id="paypal" name="metodoPagamento" />
            <label htmlFor="paypal">   Paypal</label><br />
            
            <input type="radio" id="mbway" name="metodoPagamento" />
            <label htmlFor="mbway">   MbWay</label><br />

            <input type="radio" id="multibanco" name="metodoPagamento" />
            <label htmlFor="multibanco">   Multibanco</label><br />
          </div>
          <br></br>
          <Image src={"/mb_pp.png"}
            width="300px"
            height="200px"
            objectFit="cover"
            borderRadius="lg"
            alt=""  
          />
          </Box>
          <br></br>


          

          <Text color="white" fontSize="xl" mb="8">
            Resumo de encomenda: 
          </Text>

          <Box
          background="rgb(80,80,80,0.5)"
          width="50%"
          height="70%"
          zIndex="100"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
          padding="5rem"
          borderRadius="lg"
          textColor={"white"}
          > 



          </Box>
   
            

                      <Button
                       colorScheme="green" size="lg" mt="5"
                      >
                      <Popup trigger=
                        {<button> Efetuar encomenda!</button>}
                        position="right center"
                        modal
                        contentStyle={{
                          backgroundColor: 'white',
                          padding: '2rem',
                          borderRadius: '4px',}}
                        >
                        <div>Encomenda realizada com sucesso! <br></br> Receberá mais informções no seu mail!</div>
                      </Popup>
                      </Button>

            {/* depois de escolher os produtos, volta p página das encomendas
            onde terá a lista de produtos escolhidos e pode ou cancelar ou
            prosseguir p cesto*/}

            <Link href="/about">
                      <Button
                       colorScheme="red" size="lg" mt="4"
                      >
                        Cancelar encomenda!
                      </Button>
                    </Link>
          

      </Box>
      
      </Box>

    </ThemeProvider>
  );
}
