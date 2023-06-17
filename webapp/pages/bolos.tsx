import { Box, Button, Checkbox, Flex, FormLabel, Heading, Image, Input, InputGroup, Text, ThemeProvider } from "@chakra-ui/react";
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
  image: "/bolo1.png",
  filters: [] // Add the filters property
};

export default function Produtos() {
  const router = useRouter();
  const { status, data } = useSession();
  useEffect(() => {
    console.log(status);
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  });

  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ ...initialProductState, filters: [] });
  const [editProduct, setEditProduct] = useState(null);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState([]);
  

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
      product.name.toLowerCase().includes(query.toLowerCase()) &&
      (selectedFilters.length === 0 ||
        selectedFilters.every((filter) =>
          product.filters && product.filters.includes(filter.replace(/-/g, " "))
        ))
    );
  
    setSelectedFilters(selectedFilters);
    setFilteredProducts(filtered);
    
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      filters: selectedFilters,
    }));
  };
  
  
  
  const handleFilterSelection = (filter) => {
    let updatedFilters;
    if (selectedFilters.includes(filter)) {
      updatedFilters = selectedFilters.filter((f) => f !== filter);
    } else {
      updatedFilters = [...selectedFilters, filter];
    }
  
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (updatedFilters.length === 0 ||
        updatedFilters.every((filter) =>
          product.filters && product.filters.includes(filter.replace(/-/g, " "))
        ))
    );
  
    setSelectedFilters(updatedFilters);
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
    console.log("Product added to cart:", product);
  };

  const handleDeleteProduct = (product) => {
    // Faz a requisição para excluir o produto no backend
    fetch(`https://webstore-backend-nu.vercel.app/api/deleteBolo/${product.id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        // Verifica se a exclusão foi bem-sucedida
        if (data.success) {
          // Atualiza a lista de produtos removendo o produto excluído
          setProducts((prevProducts) =>
            prevProducts.filter((p) => p.id !== product.id)
          );
        } else {
          // Exiba uma mensagem de erro ou tome uma ação apropriada
          console.log("Erro ao excluir o produto:", data.error);
        }
      })
      .catch((error) => {
        // Lida com erros de requisição
        console.log("Erro ao excluir o produto:", error);
      });
  };
  

  const handleAddProduct = () => {
    setEditProduct(null);
    setNewProduct(initialProductState);
    setShowAddProduct(true);
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
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
                onChange={handleInputChange}
              />
            </InputGroup>

            <InputGroup mb="4">
              <FormLabel color="white">Filtros</FormLabel>
              <Flex>
                <Checkbox
                  colorScheme="green"
                  checked={selectedFilters.includes("no-gluten")}
                  onChange={() => handleFilterSelection("no-gluten")}
                  mr={2}
                >
                  Sem Glúten
                </Checkbox>
                <Checkbox
                  colorScheme="green"
                  checked={selectedFilters.includes("no-lactose")}
                  onChange={() => handleFilterSelection("no-lactose")}
                >
                  Sem Lactose
                </Checkbox>
                <Checkbox
                  colorScheme="green"
                  checked={selectedFilters.includes("no-sugar")}
                  onChange={() => handleFilterSelection("no-sugar")}
                >
                  Pouco Açucar
                </Checkbox>
              </Flex>
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
                  />
                </InputGroup>
                <Flex flexWrap="wrap">
                  <Button
                    bg={selectedFilters.includes("no-gluten") ? "blue.500" : "gray.200"}
                    color={selectedFilters.includes("no-gluten") ? "white" : "black"}
                    mr={2}
                    mb={2}
                    onClick={() => handleFilterSelection("no-gluten")}
                  >
                    Sem Glúten
                  </Button>
                  <Button
                    bg={selectedFilters.includes("no-lactose") ? "blue.500" : "gray.200"}
                    color={selectedFilters.includes("no-lactose") ? "white" : "black"}
                    mr={2}
                    mb={2}
                    onClick={() => handleFilterSelection("no-lactose")}
                  >
                    Sem Lactose
                  </Button>
                  <Button
                    bg={selectedFilters.includes("no-sugar") ? "blue.500" : "gray.200"}
                    color={selectedFilters.includes("no-sugar") ? "white" : "black"}
                    mr={2}
                    mb={2}
                    onClick={() => handleFilterSelection("no-sugar")}
                  >
                    Pouco Açúcar
                  </Button>
                </Flex>
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

                    <Box mt="1" fontWeight="bold" fontSize="20px" as="h4" lineHeight="tight" isTruncated>
                      {product.name}
                    </Box>

                    <Box mt="1" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
                      {product.description}
                    </Box>

                    <Box display="flex" mt="2" alignItems="center">
                      <Text fontWeight="semibold" fontSize="30px" color="black">
                        {product.price}
                      </Text>
                      <Button ml="auto" bg="#deb887" onClick={() => handleEditProduct(product)}>
                        Editar Produto
                      </Button>
                      <Button ml="2" bg="#deb887" onClick={() => handleDeleteProduct(product)}>
                        Excluir Produto
                      </Button>
                    </Box>

                    <Box display="flex" mt="2" alignItems="center">
                      <Text fontWeight="semibold" fontSize="30px" color="black">
                        
                      </Text>
                      <Button ml="auto" bg="#deb887" onClick={() => handleAddToCart(product)}>
                        Adicionar ao carrinho
                      </Button>
                    </Box>
                  </Box>
                ))}
              </Flex>
              <Box p={6}>
                <Button bg="#deb887" onClick={handleAddProduct} mb={6}>
                  Adicionar Produto
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
