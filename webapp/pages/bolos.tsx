import { useState } from "react";
import { Box, Heading, Text, Flex, Image, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { ThemeProvider } from "@chakra-ui/react";
import theme from "../styles/styles";
import Navbar from "../components/Navbar";

const initialProductState = {
  id: "",
  name: "",
  description: "",
  price: "",
  
};

export default function Produtos() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([
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
  ]);
  const [newProduct, setNewProduct] = useState(initialProductState);
  const [showAddProduct, setShowAddProduct] = useState(false);

  const handleAddToCart = (product) => {
    const params = new URLSearchParams();
    params.set("id", product.id);
    params.set("name", product.name);
    params.set("description", product.description);
    params.set("price", product.price);
    const queryString = params.toString();
    window.location.href = `/cesto?${queryString}`;
  };

  const handleAddProduct = () => {
    const newProductId = products.length + 1;

    setProducts([
      ...products,
      {
        ...newProduct,
        id: newProductId,
      },
    ]);
    setNewProduct(initialProductState);
    setShowAddProduct(false);
  };

  const handleCancelAddProduct = () => {
    setNewProduct(initialProductState);
    setShowAddProduct(false);
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
        <Box>
          <Navbar />

          {showAddProduct ? (
            <Box p={6}>
              <FormControl mb={4}>
                <FormLabel>Nome do produto</FormLabel>
                <Input
                  type="text"
                  placeholder="Nome do produto"
                  value={newProduct.name}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      name: e.target.value,
                    })
                  }
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>Descrição do produto</FormLabel>
                <Input
                  type="text"
                  placeholder="Descrição do produto"
                  value={newProduct.description}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      description: e.target.value,
                    })
                  }
                />
              </FormControl>

              <FormControl mb={4}>
                <FormLabel>
                  Preço do produto
                </FormLabel>

                <Input
                  type="text"
                  placeholder="Preço do produto"
                  value={newProduct.price}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      price: e.target.value,
                    })
                  }
                />
              </FormControl>

  
            <Flex justify="space-between">
              <Button onClick={handleCancelAddProduct}>Cancelar</Button>
              <Button
                colorScheme="green"
                onClick={handleAddProduct}
                disabled={!newProduct.name || !newProduct.description || !newProduct.price || !newProduct.image}
              >
                Adicionar Produto
              </Button>
            </Flex>
          </Box>
        ) : (
          <>
            <Box p={6}>
              <Heading as="h1" size="xl" textAlign="center" mb={6}>
                Produtos
              </Heading>
              <Button
                colorScheme="green"
                onClick={() => setShowAddProduct(true)}
                mb={6}
              >
                Adicionar Produto
              </Button>
            </Box>
  
            <Flex flexWrap="wrap" p={6}>
              {products.map((product) => (
                <Box
                  key={product.id}
                  p={3}
                  mb={4}
                  mr={4}
                  width={{ base: "40%", md: "48%", lg: "32%" }}
                  borderWidth="1px"
                  borderRadius="lg"
                  overflow="hidden"
                  bg="#faf0e6"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    width="100%"
                    height="auto"
                    objectFit="cover"
                    borderRadius="lg"
                  />
  
                  <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
                    {product.name}
                  </Box>
  
                  <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
                    {product.description}
                  </Box>
  
                  <Box d="flex" mt="2" alignItems="center">
                    <Text fontWeight="semibold">{product.price}</Text>
                    <Button
                      ml="auto"
                      colorScheme="green"
                      onClick={() => handleAddToCart(product)}
                    >
                      Adicionar ao carrinho
                    </Button>
                  </Box>
                </Box>
              ))}
            </Flex>
          </>
        )}
      </Box>
    </Box>
  </ThemeProvider>
  );
}