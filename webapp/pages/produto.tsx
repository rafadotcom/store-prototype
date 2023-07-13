import { Box, Button, Flex, Link, Text, ThemeProvider, useBreakpointValue } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import theme from "../styles/styles";

export default function Produto() {
  const router = useRouter();
  const { status, data } = useSession();

  useEffect(() => {
    console.log(status);
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  });

  const textFontSize = useBreakpointValue({ base: "2xl", md: "4xl" });

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
          background="rgba(1, 1, 1, 0.3)"
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
            <Text
              fontSize={textFontSize}
              fontWeight="bold"
              textAlign="center"
              mb={8}
            >
              Escolhe o que te faz feliz
            </Text>
            <Flex alignItems="center" justifyContent="center" flexWrap="wrap">
              <Box mr={8} mb={4}>
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
              <Box mb={4}>
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
