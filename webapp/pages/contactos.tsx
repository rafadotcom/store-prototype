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
          <Box as="form" color={"white"} method="post" action="https://formspree.io/f/your-form-id">
            <Input type="text" color={"white"} name="name" placeholder="Seu nome" mb={4} />
            <Input type="email" color={"white"} name="_replyto" placeholder="Seu endereço de e-mail" mb={4} />
            <Textarea name="message" color={"white"} placeholder="Sua mensagem" mb={4} />
            <Button type="submit" bg="#8A624A">Enviar</Button>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
