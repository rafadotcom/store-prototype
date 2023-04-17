import { useEffect, useState } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import connect from "@/db/Connection";
import User from "@/models/schemaAdmin";
import mongoose, { Document, Model, Schema } from "mongoose";


connect();

export default function Profile() {
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const users = await User.find({});
        setUserData(users[0]);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Box maxW="md" mx="auto" mt={10} p={5}>
      <Heading as="h1" size="lg" mb={2}>
        Perfil do Usuário
      </Heading>
      <Text mb={2}>Nome: {userData.nome}</Text>
      <Text mb={2}>Email: {userData.email}</Text>
      <Text mb={2}>NIF: {userData.NIF}</Text>
      <Text mb={2}>Data de Nascimento: {userData.dataNascimento}</Text>
      <Text mb={2}>Morada: {userData.morada}</Text>
      <Text mb={2}>Telemóvel: {userData.telemovel}</Text>
    </Box>
  );
}
