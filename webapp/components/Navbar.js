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
      padding="1.5rem"
      bg="black"
      color="white"
    >
      <Flex align="center">
        <Link href="/">
          <img src="/logo.png" alt="Logo" width="40px" />
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

      <Box display={{ base: "none", md: "block" }}>
        <NextLink href="/login" passHref>
          <Button
            colorScheme="#ff8c00"
            variant="outline"
            mr={4}
            borderRadius="0"
            borderColor="white"
          >
            Sign In
          </Button>
        </NextLink>
        <NextLink href="/registo" passHref>
          <Button
            colorScheme="teal"
            variant="solid"
            borderRadius="0"
            bg="white"
            color="#ff8c00"
          >
            Sign Up
          </Button>
        </NextLink>
      </Box>
    </Flex>
  );
};

export default Navbar;
