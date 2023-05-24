import { useEffect, useState } from "react";
import { Box, Heading, Text, Flex, Image, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { ThemeProvider, InputGroup } from "@chakra-ui/react";
import theme from "../styles/styles";
import Navbar from "../components/Navbar";

const initialProductState = {
  id: "",
  name: "",
  description: "",
  price: "",
  image: "/bolo1.png",
};


export default function Produtos() {


  useEffect(() => {
    fetch("https://webstore-backend-nu.vercel.app/api/getBolos", {
      method: "GET"
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "bolos")
        setProducts(data.data)
      })
  }, [])

  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState(initialProductState);
  const [showAddProduct, setShowAddProduct] = useState(false);

  const handleCancelAddProduct = () => {
    setNewProduct(initialProductState);
    setShowAddProduct(false);
  };

  return (
    <ThemeProvider theme={theme} >
      <Box
        backgroundImage="url('/fundo2.jpg')"
        backgroundRepeat="no-repeat"
        backgroundPosition="center"
        backgroundSize="cover"
        height="100vh"
        overflowX="hidden"
      >
        <Box
          width="100%"
          height="100%"
          zIndex="100">
          <Navbar />

          {
            showAddProduct ? (
              <Box p={6} >
                <form action="https://webstore-backend-nu.vercel.app/api/addBolo" method="post" >
                  <InputGroup mb="4" >
                    <FormLabel color="white" > Nome do produto </FormLabel>
                    < Input
                      type="nome do Produto"
                      placeholder="Nome do produto"
                      name="name"
                      color="white"
                    />
                  </InputGroup>

                  < InputGroup mb="4" >
                    <FormLabel color="white" > Descrição </FormLabel>
                    < Input
                      type="descricao"
                      placeholder="Descrição do Produto"
                      name="description"
                      color="white"
                    />
                  </InputGroup>

                  < InputGroup mb="4" >
                    <FormLabel color="white" > Preço </FormLabel>
                    < Input
                      type="preco"
                      placeholder="Preço do produto"
                      name="price"
                      color="white"
                    />
                  </InputGroup>


                  < Flex justify="space-between" >
                    <Button onClick={handleCancelAddProduct}> Cancelar </Button>
                    < Button
                      type="submit"
                      colorScheme="green"
                      disabled={!newProduct.name || !newProduct.description || !newProduct.price
                      }>
                      Adicionar Produto
                    </Button>

                    < Button
                      /*action = {"api/getBolos.js"}*/
                      colorScheme="green"
                      disabled={!newProduct.name || !newProduct.description || !newProduct.price
                      }>
                      Adicionar Produto
                    </Button>
                  </Flex>
                </form>
              </Box>
            ) : (
              <>
                <Box p={6} >
                  <Heading as="h1" size="xl" textAlign="center" mb={6} >
                    Produtos
                  </Heading>
                  < Button
                    bg="#deb887"
                    onClick={() => setShowAddProduct(true)}
                    mb={6}>
                    Adicionar Produto
                  </Button>
                </Box>

                < Flex flexWrap="wrap" p={6} >
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
                      bg="#faf0e6">
                      <Image src={"/bolo1.png"}
                        alt={product.name}
                        width="100%"
                        height="auto"
                        objectFit="cover"
                        borderRadius="lg"
                      />

                      <Box mt="1" fontWeight="bold" fontSize="20px" as="h4" lineHeight="tight" isTruncated >
                        {product.name}
                      </Box>

                      < Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated >
                        {product.description}
                      </Box>

                      < Box display="flex" mt="2" alignItems="center" >
                        <Text fontWeight="semibold" fontSize="30px" color="black"> {product.price} </Text>
                        < Button
                          ml="auto"
                          bg="#deb887"
                        /*onClick = {() => handleAddToCart(product)}*/
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