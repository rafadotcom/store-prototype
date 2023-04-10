import { useState } from "react";
import { Box, Heading, Text, Flex, Image, Button } from "@chakra-ui/react";
import { ThemeProvider } from "@chakra-ui/react";
import theme from "../styles/styles";
import Navbar from "../components/Navbar";

const products = [
  {
    id: 1,
    name: "Paz",
    description: "A paz que uma dentada te trás",
    price: "3€",
    image: "/bolo1.png",
  },
  {
    id: 2,
    name: "Alegria",
    description: "a alegria está à distância de um olhar",
    price: "2€",
    image: "/bolo2.png",
  },
  {
    id: 3,
    name: "Porpurina",
    description: "uma experiência unica",
    price: "2.10€",
    image: "/bolo3.png",
  },
];

export default function Produtos() {
    const [cart, setCart] = useState([]);
  
    const handleAddToCart = (product) => {
        const params = new URLSearchParams();
        params.set('id', product.id);
        params.set('name', product.name);
        params.set('price', product.price);
        params.set('image', product.image);
        const queryString = params.toString();
        window.location.href = `/cesto?${queryString}`;
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
          {products.map((product) => {
            const price = Number(product.price.replace(/[^0-9.-]+/g, ""));
            return (
              <Box
                key={product.id}
                background="white"
                borderRadius="lg"
                boxShadow="lg"
                p={6}
                mx={4}
                my={6}
                maxW="sm"
              >
                <Image src={product.image} alt={product.name} mb={6} w="100%" h="200px" objectFit="cover" />
                <Heading as="h3" size="md" mb={2}>
                  {product.name}
                </Heading>
                <Heading as="h3" size="sm" mb={2}>
                <Text mb={2}>
                <strong>ID:</strong> {product.id}
              </Text>
                </Heading>
                <Heading as="h3" size="sm" mb={2}>
                  {product.description}
                </Heading>
                <Heading as="h3" size="sm" mb={2}>
                  {product.price}
                </Heading>
                
                <Button colorScheme="gray" onClick={() => handleAddToCart(product)}>
                  Adicionar ao carrinho
                </Button>
              </Box>
              );
            })}
          </Flex>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
