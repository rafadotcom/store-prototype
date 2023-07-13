import { Box, Button, Collapse, Flex, Link } from "@chakra-ui/react";
import { signOut } from "next-auth/react";
import NextLink from "next/link";
import { useState } from "react";

const Navbar = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handleLogOut = () => {
    signOut();
    //router.replace("/login")
  };

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="0.5rem"
      bg=""
      color="white"
    >
      <Flex align="center">
        <Link href="/">
          <img src="/logo.png" alt="Logo" width="110px" />
        </Link>
      </Flex>

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
        <Link href="/produto" mr={4} fontSize="md" fontWeight="bold" letterSpacing="wide">
          Produtos
        </Link>
      </Box>

      <Flex align="center">
        <Box display={{ md: "none" }}>
          <Button
            onClick={() => setIsCollapsed(!isCollapsed)}
            colorScheme="#8A624A"
            variant="outline"
            mr={4}
            borderRadius="0"
            borderColor="white"
          >
            Menu
          </Button>
        </Box>

        <Collapse in={!isCollapsed} animateOpacity>
          <Box
            mt={{ base: 4, md: 0 }}
            display={{ base: "block", md: "none" }}
            pb={2}
            borderBottomWidth="1px"
            borderBottomColor="white"
          >
            <Link href="/" fontSize="md" fontWeight="bold" letterSpacing="wide" display="block" py={1}>
              Home
            </Link>
            <Link href="/about" fontSize="md" fontWeight="bold" letterSpacing="wide" display="block" py={1}>
              Sobre nós
            </Link>
            <Link href="/contactos" fontSize="md" fontWeight="bold" letterSpacing="wide" display="block" py={1}>
              Contatos
            </Link>
            <Link href="/produto" fontSize="md" fontWeight="bold" letterSpacing="wide" display="block" py={1}>
              Produtos
            </Link>
            <Button
              onClick={handleLogOut}
              colorScheme="#8A624A"
              variant="outline"
              mt={4}
              borderRadius="0"
              borderColor="white"
              width="full"
            >
              Logout
            </Button>
          </Box>
        </Collapse>
      </Flex>

      <Link as={NextLink} display="flex" alignItems="center" mr={4} href="/profile" passHref >
        <img src="/perfil.png" alt="Descrição da imagem" width="50px" />
      </Link>
      <Link as={NextLink} display="flex" alignItems="center" mr={4} href="/cesto" passHref>
        <img src="/cesto.png" alt="Descrição da imagem" width="35px" />
      </Link>
      <Box display={{ base: "none", md: "block" }}>
        <Button
          onClick={handleLogOut}
          colorScheme="#8A624A"
          variant="outline"
          mr={4}
          borderRadius="0"
          borderColor="white"
        >
          Logout
        </Button>
      </Box>
    </Flex>
  );
};

export default Navbar;