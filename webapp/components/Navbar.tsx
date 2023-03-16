import { Box, Button, Heading, Link, Text, Flex } from "@chakra-ui/react";
import { ThemeProvider } from "@chakra-ui/react";
import theme from "../styles/styles";
import NextLink from "next/link";

const Navbar = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="0.5rem"
      bg="#1c1c1c"
      color="white"
    >
      <Flex align="center">
        <Link href="/">
          <img src="/logo_p.jpg" alt="Logo" width="90px" />
        </Link>
      </Flex>

      <Flex align="center" flexGrow={1}>
        <Box display={{ base: "none", md: "flex" }} ml={10}>
          <Link href="/" mr={4} fontSize="md" fontWeight="bold" letterSpacing="wide">
            Home
          </Link>
          <Link href="/about" mr={4} fontSize="md" fontWeight="bold" letterSpacing="wide">
            Sobre nós
          </Link>
          <Link href="/contact" mr={4} fontSize="md" fontWeight="bold" letterSpacing="wide">
            Contatos
          </Link>
          <Link href="/produto" mr={4} fontSize="md" fontWeight="bold" letterSpacing="wide">
            Produtos
          </Link>
          <Link href="/compras" mr={4} fontSize="md" fontWeight="bold" letterSpacing="wide">
            Compras
          </Link>
        </Box>
      </Flex>

        <NextLink href="/admin" passHref>
          <Link display="flex" alignItems="center" mr={4}>
            <img src="/perfil.png" alt="Descrição da imagem" width="50px"  />
          </Link>
        </NextLink>
      <Box display={{ base: "none", md: "block" }}>
        <NextLink href="/login" passHref>
          <Button
            colorScheme="#65000b"
            variant="outline"
            mr={4}
            borderRadius="0"
            borderColor="white"
          >
            Logout
          </Button>
        </NextLink> 
      </Box>
        

    </Flex>
  );
};

export default Navbar;
