// Importação da dependência useState
import { useEffect, useState } from "react";
import { Box, Heading, Text, Flex, Image, Button } from "@chakra-ui/react";
import { ThemeProvider } from "@chakra-ui/react";
import theme from "../styles/styles";
import Navbar from "../components/Navbar";


export default function Profile() {
  // Alteração na declaração do estado inicial de currentUser
  const [currentUser, setCurrentUser] = useState({email: "", password: "" });

  useEffect(() => {
    fetch("api/profile", {
      method: "GET"
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "user")
        setCurrentUser(data.data[3])
      })
  }, [])



  return (
    <ThemeProvider theme={theme}>
      <Box
        backgroundImage="url('/fundo2.jpg')"
        backgroundRepeat="no-repeat"
        backgroundPosition="center"
        backgroundSize="cover"
        height="100vh"
        overflowX="hidden"
      >
        <Box width="100%" height="100%" zIndex="100">
          <Navbar />

          <Flex flexWrap="wrap" p={6}>
              <Box
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
                  src={"/perfil.png"}
                  width="100%"
                  height="auto"
                  objectFit="cover"
                  borderRadius="lg"
                />


                <Box
                  mt="1"
                  fontWeight="semibold"
                  fontSize="20px"
                  as="h4"
                  lineHeight="tight"
                  isTruncated
                >
                Email: {currentUser.email}
                </Box>

                <Box
                  mt="1"
                  fontWeight="semibold"
                  fontSize="20px"
                  as="h4"
                  lineHeight="tight"
                  isTruncated
                >
                Password: {currentUser.password}
                </Box>

              </Box>
            
          </Flex>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
