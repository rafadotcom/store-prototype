import { Box, Button, Heading, Text, Flex, useColorMode } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Navbar from "../components/Navbar";

export default function Home() {
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();

  // Uncomment the code below if you want to enforce authentication for this page
  const { status, data } = useSession();
  useEffect(() => {
    console.log(data);
    console.log(status);
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  });

  const handleButtonClick = () => {
    // Toggle color mode
    toggleColorMode();
    router.push("/produto");
  };

  return (
    <Box
      backgroundImage="/fundo4.jpeg"
      backgroundRepeat="no-repeat"
      backgroundPosition="center"
      backgroundSize="cover"
      height="100vh"
      overflowX="hidden"
    >
      <Box
        background="rgba(1,1,1,0.3)"
        width="100%"
        height="100%"
        zIndex="100"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        px={4}
      >
        <Navbar />
        <Flex
          alignItems="center"
          flexWrap="wrap"
          justifyContent="center"
          flexDirection={{ base: "column", md: "row" }} // stack on small screens, row on medium and larger screens
        >
          <Box
            ml={2}
            mr={{ base: 3, md: 0 }} // margin on small screens, no margin on medium and larger screens
            mb={{ base: 8, md: 0 }} // margin bottom on small screens, no margin on medium and larger screens
            textAlign={{ base: "center", md: "left" }} // center align on small screens, left align on medium and larger screens
          >
            <Heading as="h1" fontSize={{ base: 40, md: 60 }} color="white" mb="0" mt="0">
              Bem vindo ao Take a Bite
            </Heading>
            <Text color="white" mt={10} maxWidth={600} fontSize={15}>
              Desfrute de uma experiência única, onde o aroma do café fresco e a doçura dos bolos recém-assados se encontram. A nossa paixão é oferecer produtos da mais alta qualidade, feitos com ingredientes selecionados cuidadosamente.
            </Text>
            <Button
              color={colorMode === "light" ? "white" : "#8E806E"}
              bgColor={colorMode === "light" ? "#8E806E" : "white"}
              textColor={colorMode === "light" ? "white" : "#8E806E"}
              size="lg"
              mt={10}
              onClick={handleButtonClick}
            >
              Compre Agora
            </Button>
          </Box>
          <Box
            ml={2}
            mt={10}
            width={{ base: "100%", md: "auto" }} // full width on small screens, auto width on medium and larger screens
          >
            <Box
              as="img"
              src="/cage.png"
              width={{ base: "100%", md: "700px" }} // full width on small screens, fixed width on medium and larger screens
              _hover={{
                transform: "scale(1.1)",
                transition: "transform 0.3s ease",
              }}
            />
          </Box>
        </Flex>
        <Box textAlign="center" mt={8}>
          {/* Add any additional content */}
        </Box>
      </Box>
    </Box>
  );
}