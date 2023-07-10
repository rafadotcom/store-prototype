import { Box, Button, Checkbox, Flex, FormLabel, Grid, GridItem, Heading, Image, Input, InputGroup, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text, ThemeProvider } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import theme from "../styles/styles";
import { Cart } from "../types/cart";

import connect from "@/db/Connection";

export default function cesto() {

  //redirecionar para /login ao tentar aceder esta pagina sem login
  const router = useRouter()
  const { status, data } = useSession()
  useEffect(() => {
    //console.log(status)
    if (status === "unauthenticated") {
      router.replace("/login")
    }
  })

  //obter o utilizador
  const email = data?.user.email
  //console.log(email);

  //definir variaveis
  const [cart, setCart] = useState([]);
  const [cartIsEmpty, setCartIsEmpty] = useState(false); //false porque nao se sabe se o cliente tem o cesto vazio
  const [dbCart, setDbCart] = useState([]);
  const [bolos, setBolos] = useState([]);
  const [cafes, setCafes] = useState([]);
  const [cartIsLoading, setCartIsLoading] = useState(true);
  const [productsAreLoading, setProductsAreLoading] = useState(true);

  /** 
   * Procura o cesto do utilizador
   */
  const fetchCartData = (email:string) => {
    //setCartIsLoading(true);
    const request = "https://webstore-backend-nu.vercel.app/api/getCesto?id="+email;
    fetch(request, {
      method: "GET"
    })
      .then((res) => res.json())
      .then((data:Cart) => {
        setDbCart(data.data[0].produtos);
        //console.log("products from cart fetch: ", cart)
        if (data.data[0].produtos.length<1){
          setCartIsEmpty(true);
        }
      })
      .catch((error) => {
        console.error('Error: ', error);
      });
  }

  /** 
   * Atualiza o cesto do utilizador
   */
  const updateCartData = (email:string, produto:string, quantidade:string) => {
    const request = "https://webstore-backend-nu.vercel.app/api/updateCesto?id="+email+"&prod="+produto+"&n="+quantidade;
    //console.log(request);
    fetch(request, {
      method: "POST"
    })
  }

  /** 
   * Procura todos os produtos
   */
  const fetchProducts = () => {
    const request = "https://webstore-backend-nu.vercel.app/api/getBolos";
    const request2 = "https://webstore-backend-nu.vercel.app/api/getCafes";
    //console.log(request);
    fetch(request, {
      method: "GET"
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log("products: ", data.data)
        setBolos(data.data);
      })
    fetch(request2, {
      method: "GET"
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log("products: ", data.data)
        setCafes(data.data);
      })
  }

  /**
   * Devolve a informação sobre um produto
   * Só deve ser usada quando 'bolos' e 'cafes' estão definidas
   */
  const getProductInfo = (id:string) => {
    //buscar o nome, preço e imagem
    const bolo = bolos.find(item => item._id === id); //undefined, {"name": "Drenas", "price": "2€"}
    const cafe = cafes.find(item => item._id === id); //undefined, {"name": "Drenas", "price": "2€"}
    console.log("found in bolos: ",bolo);
    console.log("found in cafes: ",cafe);
    if (bolo!==undefined) {
      console.log("it was in bolos");
      return {name: bolo.name, price: bolo.price, img: "/produto11.png", found: true}
    } else if (cafe!==undefined) {
      console.log("it was in cafes");
      return {name: cafe.name, price: cafe.price, img: "/bolo1.png", found: true}
    } else {
      return {found: false}
    }
  }

  /**
   * Preenche o cesto com a informação de cada produto
   * Só deve ser usada quando 'bolos' e 'cafes' estão definidas
   */
  const loadCart = () => {
    let newCart = [];
    console.log("cart im working with: ",dbCart);
    dbCart.map((item) => (
      newCart.push({...item, ...getProductInfo(item._id)})
    ))
    if (newCart.length > 0) {
      setCart(newCart);
    } else {
      setCartIsEmpty(true);
    }
    console.log("newCart: ",newCart);
  }

  //procura o cesto e os produtos quando a pagina e aberta
  useEffect(() => {
    console.log("-------")
    console.log("email: ", email);
    console.log("bolos: ", bolos);
    console.log("cafes: ", cafes);
    console.log("cart: ", cart);
    console.log("cart.length > 0: ", dbCart.length > 0);
    console.log("cartIsLoading: ", cartIsLoading);
    // Fetch cart data when the email variable changes
    if (typeof email === 'string' && dbCart.length===0 && cartIsLoading) {
      fetchCartData(email);
      console.log("cart feched");
    }
    if (bolos.length === 0 && cafes.length === 0) {
      fetchProducts();
      console.log("products feched");
    }
    if (!cartIsEmpty){
      if (dbCart.length > 0 && cartIsLoading && bolos.length > 0 && cafes.length > 0) {
        loadCart();
        console.log("cart loaded");
        setCartIsLoading(false);
      }
    } else { //se o cesto na bd estiver vazio
      setCartIsLoading(false);
    }
    //console.log(cart);
  }, [dbCart, email, bolos, cafes]);

  function handleQuantityChange(_id: any, value: string): void {
    updateCartData(email, _id, value);
    const foundItem = cart.find(item => item._id === _id);
    if (foundItem) {
      foundItem.quantidade = value;
      setCart([...cart]); // Update the cart state with the modified item
    }
  }

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
        <Box width="100%" height="100%" zIndex="100">
          <Navbar />

          {/* Para mostrar o que está no carrinho é preciso ir buscar á bd o carrinho do user */} 
          {/* Como é que o carrinho é guardado na bd? */}
          {/* Onde é que são adicionadas cenas ao carrinho? bolos, cafe, produto */}
          {/* cart = [{_id: "6490361c0c01c91bcaa43dde", quantidade: 1}, {_id: "6490361c0c01c91bcaa43dde", quantidade: 1}] */}
          <div>
            {cartIsLoading ? (
              <div>Loading...</div>
            ) : (
              cartIsEmpty ? (
                <div>Cart is empty</div>
              ) : (
                <Grid templateColumns="repeat(3, 1fr)" margin="1rem" gap={4}>
                  {/* Render the cart data */}
                  {cart.map((item) => (
                    //produto nao encontrado
                    item.found ? (
                      //se o produto for encontrado numa das listas  
                      <GridItem bg="#faf0e6" borderRadius="10px" key={item._id}>
                        <Box mt="1" margin="1rem" fontWeight="bold" fontSize="20px" as="h4" lineHeight="tight" isTruncated >
                        {item.name}
                        </Box>
                        <Image src={item.img}
                          alt={item.name}
                          width="100%"
                          height="auto"
                          objectFit="cover"
                          borderRadius="lg"
                        />
                        <Box display="flex" alignItems="center" justifyContent="space-between">
                          <Box ml="1.5rem" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
                            {parseFloat(item.price)*item.quantidade} €
                          </Box>
                          <NumberInput defaultValue={item.quantidade} margin="1rem" focusBorderColor="#deb887" maxW={32} min={0} precision={0} onChange={(value) => handleQuantityChange(item._id, value)}>
                            <NumberInputField size="sm" bg="white" border="1px solid #deb887"/>
                            <NumberInputStepper><NumberIncrementStepper /><NumberDecrementStepper /></NumberInputStepper>
                          </NumberInput>
                        </Box>
                      </GridItem>
                    ) : null
                  ))}
                </Grid>
              )
            )}
          </div>
          <Button ml="auto" bg="#deb887" margin="1rem">
            Comprar
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
}