import { Box, Button, Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Flex, FormLabel, Heading, Image, Input, InputGroup, Select, Text, ThemeProvider, useDisclosure, useMediaQuery } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import theme from "../styles/styles";



export default function Produtos() {

  const router = useRouter();
  const { status, data } = useSession();

  useEffect(() => {
    console.log(status);
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  });

  const email = data?.user.email

  const initialProductState = {
    id: "",
    name: "",
    description: "",
    price: "",
    glutenFree: "",
    vegetarian: "",
    vegan: "",
    seller: email,
    image: "/bolo1.png"
  };
  const [tipo, setTipo] = useState("")

  useEffect(() => {
    fetch("https://webstore-backend-nu.vercel.app/api/getUsers")
      .then((response) => response.json())
      .then((data) => {
        data.data.forEach(user => {
          if (user.email == email) {
            setTipo(user.tipo)
          }
        });
      });
  })
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()

  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState(initialProductState);
  const [editProduct, setEditProduct] = useState(null);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [productsAdded, setProductsAdded] = useState([]);
  const [comparar1, setComparar1] = useState(null);
  const [comparar2, setComparar2] = useState(null);

  useEffect(() => {
    fetch("https://webstore-backend-nu.vercel.app/api/getBolos", {
      method: "GET"
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "bolos");
        setProducts(data.data);
      });
  }, []);

  const handleCancelAddProduct = () => {
    setNewProduct(initialProductState);
    setEditProduct(null);
    setShowAddProduct(false);
  };

  const handleSearch = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Filter the products based on the search query and selected filters
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleChange = (event) => {
    setNewProduct({
      ...newProduct,
      [event.target.name]: event.target.value
    });
  };

  const handleAddToCart = (product) => {
    console.log("Product added to cart:", product);
    const request = "https://webstore-backend-nu.vercel.app/api/updateCesto?id=" + email + "&prod=" + product._id + "&n=1";
    console.log(request);
    fetch(request, {
      method: "POST"
    })
    setProductsAdded(prevProducts => [...prevProducts, product._id]);
  }

  const handleComparar = (product) => {

    if (comparar1 == null && comparar2 == null) {
      setComparar1(product)
    }
    else if (comparar1 != null && comparar2 == null) {
      setComparar2(product)
      onOpen()
    }
  }

  const handleCleanComparar = (product) => {
    setComparar1(null)
    setComparar2(null)
    onClose()
  }

  const [isPhone] = useMediaQuery("(max-width: 600px)"); 


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
        <Box width="100%" height="100%" zIndex="100">
          <Navbar />

          {showAddProduct ? (
            <Box p={6} >
              <form action="https://webstore-backend-nu.vercel.app/api/addBolo" method="post" >
                <InputGroup mb="4">
                  <FormLabel color="white">Nome do produto</FormLabel>
                  <Input
                    type="text"
                    placeholder="Nome do produto"
                    name="name"
                    color="white"
                    value={newProduct.name}
                    onChange={handleChange}
                    bg="gray.100"
                  />
                </InputGroup>

                <InputGroup mb="4">
                  <FormLabel color="white">Descrição</FormLabel>
                  <Input
                    type="descricao"
                    placeholder="Descrição do Produto"
                    name="description"
                    color="white"
                    value={newProduct.description}
                    onChange={handleChange}
                    bg="gray.100"
                  />
                </InputGroup>

                <InputGroup mb="4">
                  <FormLabel color="white">Preço</FormLabel>
                  <Input
                    type="preco"
                    placeholder="Preço do produto"
                    name="price"
                    color="white"
                    value={newProduct.price}
                    onChange={handleChange}
                    bg="gray.100"
                  />
                </InputGroup>

                <InputGroup mb="4">
                  <FormLabel color="white">Sem Gluten?</FormLabel>
                  <Select
                    name="glutenFree"
                    color="black"
                    value={newProduct.glutenFree}
                    onChange={handleChange}
                    bg="gray.100"
                  >
                    <option value='Sim'>Sim</option>
                    <option value='Nao'>Nao</option>
                  </Select>
                </InputGroup>

                <InputGroup mb="4">
                  <FormLabel color="white">Vegetariano?</FormLabel>
                  <Select
                    name="vegetarian"
                    color="black"
                    value={newProduct.vegetarian}
                    onChange={handleChange}
                    bg="gray.100"
                  >
                    <option value='Sim'>Sim</option>
                    <option value='Nao'>Nao</option>
                  </Select>
                </InputGroup>

                <InputGroup mb="4">
                  <FormLabel color="white">Vegan?</FormLabel>
                  <Select
                    name="vegan"
                    color="black"
                    value={newProduct.vegan}
                    onChange={handleChange}
                    bg="gray.100"
                  >
                    <option value='Sim'>Sim</option>
                    <option value='Nao'>Nao</option>
                  </Select>
                </InputGroup>

                <InputGroup mb="4" display="none">
                  <FormLabel color="white">Vendedor</FormLabel>
                  <Input
                    type="preco"
                    name="seller"
                    color="white"
                    value={newProduct.seller}
                    defaultValue={email}
                  />
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
              <Box p={6}>
                <Heading as="h1" size="xl" textAlign="center" mb={6}>
                  Produtos
                </Heading>
                <InputGroup mb={6}>
                  <Input
                    type="text"
                    placeholder="Pesquisar produto"
                    value={searchQuery}
                    onChange={handleSearch}
                    bg="gray.100"
                    _placeholder={{ color: "grey" }}
                  />
                </InputGroup>
                {tipo === "vendedor" &&
                  <Box p={6}>
                    <Button
                      bg="#deb887"
                      onClick={() => setShowAddProduct(true)}
                      mb={6}
                    >
                      Adicionar Produto
                    </Button>
                  </Box>
                }

                <Flex flexWrap="wrap">
                </Flex>
              </Box>

              <Flex flexWrap="wrap" p={6} flexDirection={isPhone ? "column" : "row"}>
                {(searchQuery ? filteredProducts : products).map((product) => (
                  <Box
                    key={product.id}
                    p={3}
                    mb={4}
                    mr={4}
                    width={{ base: isPhone ? "100%" : "48%", md: "48%", lg: "32%" }}
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    bg="#faf0e6"
                  >
                    <Image
                      src={"/bolo1.png"}
                      alt={product.name}
                      width="100%"
                      height="auto"
                      objectFit="cover"
                      borderRadius="lg"
                    />

                    <Box mt="1" fontWeight="bold" color="black" fontSize="20px" as="h4" lineHeight="tight" isTruncated>
                      {product.name}
                    </Box>

                    <Box mt="1" fontWeight="semibold" color="black" as="h4" lineHeight="tight" isTruncated>
                      {product.description}
                    </Box>

                    <Box display="flex" mt="2" alignItems="center">
                      <Text fontWeight="semibold" fontSize="30px" color="black">
                        {product.price + "€"}
                      </Text>
                    </Box>

                    <Box display="flex" mt="2" alignItems="center">
                      <Text fontWeight="semibold" fontSize="15px" color="black">
                        {product.seller}
                      </Text>
                    </Box>

                    <Box display="flex" mt="2" alignItems="center">
                      <Text fontWeight="semibold" fontSize="30px" color="black">

                      </Text>
                      <Button
                        ml="auto"
                        bg="#deb887"
                        onClick={() => handleComparar(product)}
                        isDisabled={comparar1 == product || (comparar1 != null && comparar2 != null) ? true : false}
                      >
                        Comparar
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
      <Drawer
        closeOnOverlayClick={false}
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
        size="lg"
        
        
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Comparar Produtos:</DrawerHeader>

          {comparar1 != null && comparar2 != null &&
            <DrawerBody>
              <Flex direction={isPhone ? "column" : "row"}>
                <Flex
                  direction="column"
                >
                  <Image
                    src={"/bolo1.png"}
                    alt={comparar1.name}
                    width="100%"
                    height="auto"
                    objectFit="cover"
                    borderRadius="lg"
                  />

                  <Box mt="1" fontWeight="bold" fontSize="20px" as="h4" lineHeight="tight" isTruncated>
                    {comparar1.name}
                  </Box>

                  <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
                    {comparar1.description}
                  </Box>

                  <Box display="flex" mt="10" alignItems="center">
                    <Text fontWeight="semibold" fontSize="17px" color="black">
                      {"Vendedor: " + comparar1.seller}
                    </Text>
                  </Box>

                  <Box display="flex" mt="2" alignItems="center">
                    <Text fontWeight="semibold" fontSize="17px" color={
                      (comparar1.glutenFree == comparar2.glutenFree) ?
                        "black"
                        : (comparar1.glutenFree == "Sim" ? "green" : "red")
                    }>
                      {"Sem Gluten?: " + comparar1.glutenFree}
                    </Text>
                  </Box>

                  <Box display="flex" mt="2" alignItems="center">
                    <Text fontWeight="semibold" fontSize="17px" color={
                      (comparar1.vegetarian == comparar2.vegetarian) ?
                        "black"
                        : (comparar1.vegetarian == "Sim" ? "green" : "red")
                    }>
                      {"Vegetariano?: " + comparar1.vegetarian}
                    </Text>
                  </Box>

                  <Box display="flex" mt="2" alignItems="center">
                    <Text fontWeight="semibold" fontSize="17px" color={
                      (comparar1.vegan == comparar2.vegan) ?
                        "black"
                        : (comparar1.vegan == "Sim" ? "green" : "red")
                    }>
                      {"Vegan?: " + comparar1.vegan}
                    </Text>
                  </Box>

                  <Box display="flex" mt="2" alignItems="center">
                    <Text fontWeight="semibold" fontSize="17px" color={
                      (Number(comparar1.price) == Number(comparar2.price)) ?
                        "black"
                        : (Number(comparar1.price) < Number(comparar2.price) ? "green" : "red")
                    }>
                      {"Preço: " + comparar1.price + "€"}
                    </Text>
                  </Box>
                </Flex>

                <Flex
                  direction="column"
                >
                  <Image
                    src={"/bolo1.png"}
                    alt={comparar2.name}
                    width="100%"
                    height="auto"
                    objectFit="cover"
                    borderRadius="lg"
                  />

                  <Box mt="1" fontWeight="bold" fontSize="20px" as="h4" lineHeight="tight" isTruncated>
                    {comparar2.name}
                  </Box>

                  <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
                    {comparar2.description}
                  </Box>

                  <Box display="flex" mt="10" alignItems="center">
                    <Text fontWeight="semibold" fontSize="17px" color="black">
                      {"Vendedor: " + comparar2.seller}
                    </Text>
                  </Box>

                  <Box display="flex" mt="2" alignItems="center">
                    <Text fontWeight="semibold" fontSize="17px" color={
                      (comparar1.glutenFree == comparar2.glutenFree) ?
                        "black"
                        : (comparar2.glutenFree == "Sim" ? "green" : "red")
                    }>
                      {"Sem Gluten?: " + comparar2.glutenFree}
                    </Text>
                  </Box>

                  <Box display="flex" mt="2" alignItems="center">
                    <Text fontWeight="semibold" fontSize="17px" color={
                      (comparar1.vegetarian == comparar2.vegetarian) ?
                        "black"
                        : (comparar2.vegetarian == "Sim" ? "green" : "red")
                    }>
                      {"Vegetariano?: " + comparar2.vegetarian}
                    </Text>
                  </Box>

                  <Box display="flex" mt="2" alignItems="center">
                    <Text fontWeight="semibold" fontSize="17px" color={
                      (comparar1.vegan == comparar2.vegan) ?
                        "black"
                        : (comparar2.vegan == "Sim" ? "green" : "red")
                    }>
                      {"Vegan?: " + comparar2.vegan}
                    </Text>
                  </Box>

                  <Box display="flex" mt="2" alignItems="center">
                    <Text fontWeight="semibold" fontSize="17px" color={
                      (Number(comparar1.price) == Number(comparar2.price)) ?
                        "black"
                        : (Number(comparar2.price) < Number(comparar1.price) ? "green" : "red")
                    }>
                      {"Preço: " + comparar2.price + "€"}
                    </Text>
                  </Box>
                </Flex>

              </Flex>
            </DrawerBody>
          }



          <DrawerFooter>
            <Button color={"black"} variant='outline' mr={3} onClick={handleCleanComparar}>
              Limpar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </ThemeProvider>
  );
}

