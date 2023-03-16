import { useState } from "react";
import { Box, Button, Heading, Text, Flex, Image, Grid, GridItem } from "@chakra-ui/react";
import { ThemeProvider } from "@chakra-ui/react";
import theme from "../styles/styles";
import Navbar from "../components/Navbar";
import { products } from "@/types/products";

export default function Cesto() {
  const [cartItems, setCartItems] = useState<products[]>([]);

  const removeFromCart = (productId:number) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);
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
          <Navbar /* pos="absolute" top={0} left={0} right={0} zIndex="docked" */ /> 
          <Box pt="64px"> 
            <Flex
              direction="column"
              justify="center"
              alignItems="center"
              height="100%"
              px={8}
            >
              <Heading as="h1" size="2xl" color="white" mb={4}>
                Cesto de Compras
              </Heading>
              {cartItems.length === 0 ? (
                <Text color="white">O seu cesto está vazio.</Text>
              ) : (
                <Grid
                  templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
                  gap={6}
                >
                  {cartItems.map((item) => (
                    <GridItem key={item.id}>
                      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" borderColor="transparent">
                        <Image src={item.image} alt={item.name} display="block" maxWidth="40%" mx="auto" /> 
                        <Box p="6" m="0">
                          <Box display="flex" alignItems="baseline" >
                            <Text fontWeight="bold" fontSize="2xl" mr={2}>
                              {item.name}
                            </Text>
                            <Text fontSize="lg" color="gray.500">
                              {item.price}
                            </Text>
                          </Box>
                          <Button mt={4} colorScheme="#65000b" onClick={() => removeFromCart(item.id)}>
                            Remover do Cesto
                          </Button>
                        </Box>
                      </Box>
                    </GridItem>
                  ))}
                </Grid>
              )}
            </Flex>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
