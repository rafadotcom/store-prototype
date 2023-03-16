import { useState } from "react";
import { Box, Button, Heading, Link, Text, Flex, Image, Grid, GridItem } from "@chakra-ui/react";
import { ThemeProvider } from "@chakra-ui/react";
import theme from "../styles/styles";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";
import { products } from "@/types/products";

export default function Home() {
  const router = useRouter();

  const products: products[] = [
    {
      id: 1,
      name: "La Chorona",
      description: "Perfeito para dias triste",
      image: "/produto1.png",
      seller: {
        id: 1,
        name: "Maria Albertina",
        rating: 4.5,
        image: "/vendedor1.png",
      },
      price: 100,
    },
    {
      id: 2,
      name: "El Matador",
      description: "Perfeito para longas noites de estudo",
      image: "/produto2.png",
      seller: {
        id: 2,
        name: "Tó Zé",
        rating: 4.2,
        image: "/vendedor1.png",
      },
      price: 150,
    },
  ];

  const handleClick = (productId:number) => {
    router.push({
      pathname: "/compras",
      query: { productId },
    });
  };

  return (
    <ThemeProvider theme={theme}>
      
      <Box
        bgImage="url('/fundo.jpg')"
        bgRepeat="no-repeat"
        bgPos="center"
        bgSize="cover"
        overflowX="hidden"
        pos="relative" 
        >
        <Box
        background="rgb(1,1,1,0.3)"
        width="100%"
        height="100%"
        zIndex="100"
        >
        <Navbar /* TODO pos="absolute" top={0} left={0} right={0} zIndex="docked" *//> 
        <Box pt="64px"> 
          <Flex
            direction="column"
            justify="center"
            alignItems="center"
            height="100%"
            px={8}
          >
            <Heading as="h1" size="2xl" color="white" mb={4}>
              Vinhos
            </Heading>
            <Grid
              templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
              gap={6}
            >
              {products.map((product) => (
                <GridItem key={product.id}>
                <Box borderWidth="1px" borderRadius="lg" overflow="hidden" borderColor="transparent">
                    <Image src={product.image} alt={product.name} display="block" maxWidth="40%" mx="auto" /> 
                    <Box p="6" m="0">
                      <Box display="flex" alignItems="baseline" >
                        <Text fontWeight="bold" fontSize="2xl" mr={2}>
                          {product.name}
                        </Text>
                        <Text fontSize="lg" color="gray.500">
                          {product.price}
                        </Text>
                      </Box>
                      <Button mt={4} colorScheme="#65000b" onClick={() => handleClick(product.id)}>
                        Comprar
                      </Button>
                    </Box>
                  </Box>
                </GridItem>
              ))}
            </Grid>
          </Flex>
        </Box>
      </Box>
      </Box>
    </ThemeProvider>
  );
}
``
