import { Box, Button, Heading, Input, Textarea, ThemeProvider } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Navbar from "../components/Navbar";
import theme from "../styles/styles";

export default function Contact() {

  const router = useRouter()
  const { status, data } = useSession()
  useEffect(() => {
    console.log(status)
    if (status === "unauthenticated") {
      router.replace("/login")
    }
  })

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
        <Navbar />

        <Box

          width="80%"
          height="80%"
          zIndex="100"
          p={8}
        >
          <Heading color="white" as="h1" mb={8}>Entre em contato conosco</Heading>
          <Box as="form" method="post" action="https://formspree.io/f/your-form-id">
            <Input type="text" name="name" color= "black" placeholder="Seu nome"  _placeholder={{ color: "grey" }} mb={4} bg="gray.100"/>
            <Input type="email" name="_replyto" color= "black" placeholder="Seu endereço de e-mail" _placeholder={{ color: "grey" }} mb={4} bg="gray.100" />
            <Textarea name="message" color= "black" placeholder="Sua mensagem" mb={4} _placeholder={{ color: "grey" }} bg="gray.100" />
            <Button type="submit" color="white" bg="#8A624A">Enviar</Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
