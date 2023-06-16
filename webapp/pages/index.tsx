import { Box } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import Navbar from "../components/Navbar";

export default function Home() {

  //copiar para todas as peginas que se queiram bloquear!!
  const router = useRouter()
  const { status, data } = useSession()
  useEffect(() => {
    console.log(data)
    console.log(status)
    if (status === "unauthenticated") {
      router.replace("/login")
    }
  })

  return (
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
      </Box>
    </Box>
  );
}
