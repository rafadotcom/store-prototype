import { useState } from "react";
import { Box, Button, Heading, Link, Text, Flex, Image, Grid, GridItem } from "@chakra-ui/react";
import { ThemeProvider } from "@chakra-ui/react";
import theme from "../styles/styles";
import Navbar from "../components/Navbar";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();

  const products = [
    {
      id: 1,
      name: "Gin Lua",
      image: "/produto1.jpeg",
      price: "2€",
    },
    {
      id: 2,
      name: "Gin Belgravia azul",
      image: "/produto2.jpeg",
      price: "2€",
    },
    {
      id: 3,
      name: "Gin Belgravia rosa",
      image: "/produto3.jpeg",
      price: "2€",
    },
    {
      id: 4,
      name: "Gin",
      image: "/produto4.jpeg",
      price: "2€",
    },
    {
      id: 5,
      name: "Gin",
      image: "/produto5.png",
      price: "2€",
    },
    {
      id: 6,
      name: "Gin",
      image: "/produto6.jpeg",
      price: "2€",
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
        bgImage="url('/cuca.jpg')"
        bgRepeat="no-repeat"
        bgPos="center"
        bgSize="cover"
        minH="100vh"
        overflowX="hidden"
        pos="relative" 
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
              Gins
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
                      <Box /*d="flex"*/ alignItems="baseline" >
                        <Text fontWeight="bold" fontSize="2xl" mr={2}>
                          {product.name}
                        </Text>
                        <Text fontSize="lg" color="gray.500">
                          {product.price}
                        </Text>
                      </Box>
                      <Button mt={4} colorScheme="orange" onClick={() => handleClick(product.id)}>
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
    </ThemeProvider>
  );
}
``
