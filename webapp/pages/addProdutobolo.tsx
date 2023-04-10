import { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Flex,
  Image,
  Button,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { ThemeProvider } from "@chakra-ui/react";
import theme from "../styles/styles";
import Navbar from "../components/Navbar";

export default function AddProduct({ onAddProduct }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      id: Math.random(),
      name,
      description,
      price,
      image,
    };
    onAddProduct(newProduct);
    setName("");
    setDescription("");
    setPrice("");
    setImage("");
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
          <Flex
            justifyContent="center"
            alignItems="center"
            height="calc(100vh - 200px)"
          >
            <Box
              background="white"
              borderRadius="lg"
              boxShadow="lg"
              p={6}
              maxW="sm"
            >
              <Heading as="h3" size="lg" mb={2}>
                Adicionar novo bolo
              </Heading>
              <form onSubmit={handleSubmit}>
                <Input
                  placeholder="Nome"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  mb={2}
                />
                <Textarea
                  placeholder="Descrição"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  mb={2}
                />
                <Input
                  placeholder="Preço"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  mb={2}
                />
                <Input
                  placeholder="URL da imagem"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  mb={2}
                />
                <Button colorScheme="gray" type="submit">
                  Adicionar
                </Button>
              </form>
            </Box>
          </Flex>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
