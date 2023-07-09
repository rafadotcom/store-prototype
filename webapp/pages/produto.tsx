import { Box, Button, Flex, Link, Text, ThemeProvider } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import theme from "../styles/styles";

export default function Produto() {

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
      >
        <Box
          background="rgb(1,1,1,0.3)"
          width="100%"
          height="100%"
          zIndex="100"
        >
          <Navbar />
          <Flex
            direction="column"
            alignItems="center"
            justifyContent="center"
            height="80%"
          >
            <Text fontSize="4xl" fontWeight="bold" textAlign="center" mb={8}>
              Escolhe o que te faz feliz
            </Text>
            <Flex alignItems="center" justifyContent="center">
              <Box mr={8}>
                <Box
                  backgroundImage="url('/bolo1.png')"
                  backgroundRepeat="no-repeat"
                  backgroundPosition="center"
                  backgroundSize="cover"
                  height="300px"
                  width="300px"
                  borderRadius="50%"
                  overflow="hidden"
                  position="relative"
                >
                  <Link href="/bolos">
                    <Button
                      position="absolute"
                      bottom={0}
                      left={0}
                      right={0}
                      mx="auto"
                      mb={4}
                    >
                      Cupcake
                    </Button>
                  </Link>
                </Box>

              </Box>
              <Box>
                <Box
                  backgroundImage="url('/produto33.png')"
                  backgroundRepeat="no-repeat"
                  backgroundPosition="center"
                  backgroundSize="cover"
                  height="300px"
                  width="300px"
                  borderRadius="50%"
                  overflow="hidden"
                  position="relative"
                >
                  <Link href="/cafe">
                    <Button
                      position="absolute"
                      bottom={0}
                      left={0}
                      right={0}
                      mx="auto"
                      mb={4}
                    >
                      Café
                    </Button>
                  </Link>
                </Box>

              </Box>
            </Flex>
          </Flex>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
