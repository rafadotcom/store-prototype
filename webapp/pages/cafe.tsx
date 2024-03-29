import { Box, Button, Flex, FormLabel, Heading, Image, Input, InputGroup, Text, ThemeProvider } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import theme from "../styles/styles";

const initialProductState = {
  id: "",
  name: "",
  description: "",
  price: "",
  image: "/produto11.png",
};


export default function Produtos() {

  const router = useRouter()
  const { status, data } = useSession()
  useEffect(() => {
    console.log(status)
    if (status === "unauthenticated") {
      router.replace("/login")
    }
  })

  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState(initialProductState);
  const [editProduct, setEditProduct] = useState(null);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productsAdded, setProductsAdded] = useState([]);

  fetch("https://webstore-backend-nu.vercel.app/api/getCafes", {
    method: "GET"
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "cafes")
      setProducts(data.data)
    })
  
  //obter o utilizador
  const email = data?.user.email

  const handleCancelAddProduct = () => {
    setNewProduct(initialProductState);
    setEditProduct(null);
    setShowAddProduct(false);
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Filter the products based on the search query
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };
  
  const handleEditProduct = (product) => {
    setEditProduct(product);
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
    }));
    setShowAddProduct(true);
  };
  

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleAddToCart = (product) => {
    const request = "https://webstore-backend-nu.vercel.app/api/updateCesto?id="+email+"&prod="+product._id+"&n=1";
    console.log(request);
    fetch(request, {
      method: "POST"
    })
    console.log("Product added to cart:", product.name, " x1");
    setProductsAdded(prevProducts => [...prevProducts, product._id]);
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
                <form action="https://webstore-backend-nu.vercel.app/api/addCafe" method="post" >
                  <InputGroup mb="4">
                    <FormLabel color="white">Nome do produto</FormLabel>
                    <Input
                      type="text"
                      placeholder="Nome do produto"
                      name="name"
                      color="white"
                      value={newProduct.name}
                      onChange={handleInputChange}
                      bg="gray.100"/>
                  </InputGroup>

                  < InputGroup mb="4" >
                    <FormLabel color="white" > Descrição </FormLabel>
                    < Input
                      type="descricao"
                      placeholder="Descrição do Produto"
                      name="description"
                      color="white"
                      value={newProduct.description}
                      onChange={handleInputChange}
                      bg="gray.100"/>
                  </InputGroup>

                  < InputGroup mb="4" >
                    <FormLabel color="white" > Preço </FormLabel>
                    < Input
                      type="preco"
                      placeholder="Preço do produto"
                      name="price"
                      color="white"
                      value={newProduct.price}
                      onChange={handleInputChange}
                      bg="gray.100" />
                  </InputGroup>


                  <Flex justify="space-between">
                    <Button onClick={handleCancelAddProduct}>Cancelar</Button>
                    <Button
                      type="submit"
                      colorScheme="green"
                      disabled={
                        !newProduct.name ||
                        !newProduct.description ||
                        !newProduct.price
                      }
                    >
                      {editProduct ? "Editar Produto" : "Adicionar Produto"}
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
                  <InputGroup mb={6}>
                  <Input
                    type="text"
                    placeholder="Pesquisar produto"
                    value={searchQuery}
                    onChange={handleSearch}
                    bg="gray.100"
                  />
                </InputGroup>
                  <Button
                    bg="#deb887"
                    onClick={() => setShowAddProduct(true)}
                    mb={6}>
                    Adicionar Produto
                  </Button>
                </Box>

                <Flex flexWrap="wrap" p={6}>
                  {(searchQuery ? filteredProducts : products).map((product) => (
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
                      <Image src={"/produto11.png"}
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
                          onClick={() => handleEditProduct(product)}
                          >
                            Editar Produto
                          </Button>
                        </Box>
    
                        <Box display="flex" mt="2" alignItems="center">
                          <Text fontWeight="semibold" fontSize="30px" color="black">
                            
                          </Text>
                            {productsAdded.includes(product._id) ? (
                              <Button
                              ml="auto"
                              bg="#deb887"
                              onClick={() => handleAddToCart(product)}
                              isDisabled={true}
                              >
                                Adicionado
                              </Button>
                            ) : (
                            <Button
                              ml="auto"
                              bg="#deb887"
                              onClick={() => handleAddToCart(product)}
                            >
                              Adicionar ao Cesto
                            </Button>
                            )}
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
    
    