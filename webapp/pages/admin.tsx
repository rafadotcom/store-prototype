import { Box, Button, Heading, Link, Text, Flex, SimpleGrid, IconButton, Input, InputProps } from "@chakra-ui/react";
import { FaUser, FaCog, FaChartBar, FaEdit } from "react-icons/fa";
import { ThemeProvider } from "@chakra-ui/react";
import theme from "../styles/styles";
import Navbar from "../components/Navbar";
import { useState } from "react";

export default function Admin() {
  const [name, setName] = useState("John Doe");
  const [dob, setDob] = useState("22-06-2001");
  const [mail, setMail] = useState("aluno@gmail.com");
  const [NIF, setNIF] = useState ("123456789");
  const [morada, setMorada] = useState("morada");
  const [telemovel, setTele] = useState("123456789");
  const [password, setPass] = useState("1234");

  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingDob, setIsEditingDob] = useState(false);
  const [nameError, setNameError] = useState("");
  const [dobError, setDobError] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [isEditingProfilePicture, setIsEditingProfilePicture] = useState(false);
  const [profilePictureError, setProfilePictureError] = useState("");

  const handleProfilePictureEditClick = () => {
    setIsEditingProfilePicture(true);
  };

  const handleProfilePictureSaveClick = () => {
    if (!profilePicture) {
      setProfilePictureError("Por favor, selecione uma imagem");
      return;
    }
    setIsEditingProfilePicture(false);
    setProfilePictureError("");
  };


  const handleNameChange = (event:any) => {
    setName(event.target.value);
  };

  const handleDobChange = (event:any) => {
    setDob(event.target.value);
  };

  const handleNameEditClick = () => {
    setIsEditingName(true);
  };

  const handleDobEditClick = () => {
    setIsEditingDob(true);
  };

  const handleNameSaveClick = () => {
    if (name.trim() === "") {
      setNameError("O nome não pode ficar em branco");
      return;
    }
    setIsEditingName(false);
    setNameError("");
  };

  const handleDobSaveClick = () => {
    if (dob.trim() === "") {
      setDobError("A data de nascimento não pode ficar em branco");
      return;
    }
    setIsEditingDob(false);
    setDobError("");
  };

  const handleCancelEditDob = () => {
    setIsEditingDob(false);
    setDobError("");
  };

  const handleEditDob = () => {
    setIsEditingDob(true);
  };

  const handleProfilePictureChange = (event:any) => {
    setProfilePicture(event.target);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        backgroundImage="url('/fundo.jpg')"
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
          <Box py="8">
            <Heading size="lg" textAlign="center" color="#fff">
              Bem-vindo à área de administrador
            </Heading>
            <Box textAlign="center" mt="4">
              {isEditingName ? (
                <Flex alignItems="center" justifyContent="center">
                  <Box mr="4">
                    <input
                      type="text"
                      value={name}
                      onChange={handleNameChange}
                      placeholder="Digite seu nome"
                    />
                    {nameError && <Text color="red.500">{nameError}</Text>}
                  </Box>
                  <Button colorScheme="teal" onClick={handleNameSaveClick}>
                    Salvar
                  </Button>
                </Flex>
              ) : (
                <Flex alignItems="center" justifyContent="center">
                  <Text mr="4">{name}</Text>
                  <IconButton
                      icon={<FaUser />}
                      colorScheme="teal"
                      size="lg"
                      variant="ghost"
                      onClick={handleNameEditClick} 
                      aria-label={""}                 
                      />
                </Flex>
              )}

              
              {isEditingDob ? (
                <Flex alignItems="center" justifyContent="center">
                  <Box mr="4">
                  </Box>
                    <Button colorScheme="teal" onClick={handleDobSaveClick}>
                    Salvar
                    </Button>
                    <Button ml="2" onClick={() => setIsEditingDob(false)}>
                    Cancelar
                    </Button>
                    </Flex>
                    ) : (
                    <Box>
                    <Text fontWeight="semibold">Data de Nascimento:</Text>
                    <Text>{dob}</Text>
                    <IconButton
                      icon={<FaCog />}
                      variant="ghost"
                      colorScheme="teal"
                      size="sm"
                      onClick={handleDobEditClick} 
                      aria-label={""}                    
                      />
                    </Box>

                    )}
                    {isEditingProfilePicture ? (
                      <Flex alignItems="center" justifyContent="center">
                        <Box mr="4">
                          <Input type="file" onChange={handleProfilePictureChange} />
                          {profilePictureError && <Text color="red.500">{profilePictureError}</Text>}
                        </Box>
                        <Button colorScheme="teal" onClick={handleProfilePictureSaveClick}>
                          Salvar
                        </Button>
                        <Button ml="2" onClick={() => setIsEditingProfilePicture(false)}>
                          Cancelar
                        </Button>
                      </Flex>
                    ) : (
                      <Box>
                        <Text fontWeight="semibold">Foto de Perfil:</Text>
                        {profilePicture ? (
                          <Box as="img" src={profilePicture} />
                        ) : (
                          <Text>Nenhuma imagem selecionada</Text>
                        )}
                        <IconButton
                      icon={<FaEdit />}
                      variant="ghost"
                      colorScheme="teal"
                      size="sm"
                      onClick={handleProfilePictureEditClick} aria-label={""}                      
                      />
                    )
                  </Box>
                )}
        </Box>
        <SimpleGrid columns={[1, null, 2]} gap="8" mt="8">
          <Box  p="6" borderRadius="md">
            <Box textAlign="center">
              <Box
                bg="teal.200"
                w="16"
                h="16"
                mx="auto"
                borderRadius="full"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <FaCog size={24} />
              </Box>
              <Text mt="4" fontWeight="semibold">
                Configurações
              </Text>
            </Box>
          </Box>
        </SimpleGrid>
      </Box>
    </Box>
  </Box>
</ThemeProvider>
                    );
                    }