import { useState, useEffect } from "react";
import { Box, Heading, Text, Flex, Image, Button } from "@chakra-ui/react";
import { ThemeProvider } from "@chakra-ui/react";
import theme from "../styles/styles";
import Navbar from "../components/Navbar";

export default function Cesto() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const items = [];
    params.forEach((value, key) => {
      items.push({ [key]: value });
    });
    setCart(items);
  }, []);

  const product = {
    id: cart.find(item => item.id)?.id || "1",
    name: cart.find(item => item.name)?.name || "Produto Teste",
    price: cart.find(item => item.price)?.price || "10,00",
    image: cart.find(item => item.image)?.image || "https://via.placeholder.com/150",
  };

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
          <Flex flexWrap="wrap" justifyContent="center" alignItems="center" mt={10}>
            <Box
              background="white"
              borderRadius="lg"
              boxShadow="lg"
              p={6}
              mx={4}
              my={6}
              maxW="sm"
            >
              <Image src={product.image} alt={product.name} mb={6} w="100%" h="200px" objectFit="cover" />                
              <Text mb={2}>
                <strong>Preço:</strong> {product.price}
              </Text>
              <Button
                colorScheme="green"
                onClick={() => {
                  window.location.href = `/encomenda?${query.toString()}`;
                }}
              >
                Pagar
              </Button>
            </Box>
          </Flex>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
