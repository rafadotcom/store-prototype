import { useState } from "react";
import { Box, Heading, Text, Flex, Image, Button } from "@chakra-ui/react";
import { ThemeProvider } from "@chakra-ui/react";
import theme from "../styles/styles";
import Navbar from "../components/Navbar";

const products = [
  {
    id: 1,
    name: "Dream Galão",
    description: "Um galão unico com toques de boa sorte",
    price: "3€",
    image: "/produto11.png",
  },
  {
    id: 2,
    name: "Dream BlackBlack",
    description: "Um poder intenso de energia e amor",
    price: "2€",
    image: "/produto22.png",
  },
  {
    id: 3,
    name: "Dream expresso",
    description: "A cura perfeita para noites pesadas",
    price: "2.10€",
    image: "/produto33.png",
  },
];

export default function Produtos() {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    const query = new URLSearchParams({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    window.location.href = `/cesto?${query.toString()}`;
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
