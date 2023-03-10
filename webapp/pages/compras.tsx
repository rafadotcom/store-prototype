import { Box, Heading, Text, Stack, Image, Button, Grid, GridItem } from "@chakra-ui/react";
import { ThemeProvider } from "@chakra-ui/react";
import theme from "../styles/styles";
import Navbar from "../components/Navbar";

export default function Home() {
  // array de produtos
  const products = [
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

  return (
    <Box bgImage="url('/cuca.jpg')"
    bgRepeat="no-repeat"
    bgPos="center"
    bgSize="cover"
    minH="100vh"
    overflowX="hidden"
    pos="relative" >
      <Navbar />

      <Box bgImage="url('/cuca.jpeg')" py={10}>
        <Box bgImage="url('/cuca.jpeg')" bgSize="cover" bgPosition="center" h="300px" mb={10}>
          <Box maxW="960px" mx="auto" pt={20}>
            <Heading as="h1" size="2xl" color="white">
              A melhor seleção de produtos para você
            </Heading>
            <Text color="#8B4000" fontSize="xl" mt={5}>
              Encontre tudo o que precisa no nosso catálogo online.
            </Text>
          </Box>
        </Box>

        <Box maxW="960px" mx="auto" px={5}>
          

          <Grid templateColumns={{ base: "1fr", md: "repeat(1, 1fr)", lg: "repeat(1, 1fr)" }} gap={10}>
            {products.map((product) => (
              <GridItem key={product.id}>
                <Box boxShadow="md" borderRadius="md" overflow="hidden" bg="rgb(245,245,245, 0.9)">
                <Image src={product.image} maxW="200px" />

                  <Box p={5}>
                    <Heading as="h3" size="lg" mb={2} color="#8B4000">
                      {product.name}
                    </Heading>
                    <Text mb={2} color="gray.600">
                      {product.description}
                    </Text>
                    <Text mb={2} color="gray.600">
                      Vendedor: {product.seller.name} ({product.seller.rating})
                    </Text>

                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                      <Text color="gray.600">{product.price}€</Text>
                      <Button colorScheme="orange" size="lg">
                        Comprar
                      </Button>
                    </Stack>
                  </Box>
                </Box>
              </GridItem>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
