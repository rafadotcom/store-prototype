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
      bg="black"
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
          <Link href="/contactos" mr={4} fontSize="md" fontWeight="bold" letterSpacing="wide">
            Contatos
          </Link>
        </Box>
      </Flex>

      <Box display={{ base: "none", md: "block" }}>
        <NextLink href="/login" passHref>
          <Button
            colorScheme="#65000b"
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
            color="#65000b"
          >
            Sign Up
          </Button>
        </NextLink>
      </Box>
    </Flex>
  );
};

export default Navbar;
