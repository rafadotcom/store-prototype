import { Select, Box, Button, Checkbox, Flex, FormLabel, Grid, GridItem, Heading, Image, Input, InputGroup, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text, ThemeProvider, Spinner } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import theme from "../styles/styles";
import { Cart } from "../types/cart";
import Stripe from 'stripe';

import connect from "@/db/Connection";
import { create } from "domain";

export default function Cesto() {
  const stripe = new Stripe('sk_test_51NSHZzAjScMaZI5GQoyzqHr6lyDoersNIlwvWFdcGgqiieHEVEQvsi6nfWtTHKyxtWj2eZ6LjYdutVNnbejFRQ2I00KhriYYnh',{
    apiVersion: '2022-11-15',
  });
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
  const [total, setTotal] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [valorApos, setvalorApos] = useState(0);
  const [nomeEnvio,setNomeEnvio] = useState('');
  const [precoEnvio,setPrecoEnvio] = useState('');

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
  const handlePayment = async () => {
    const items = new Map([])
    let counter = 0
    for (let i=0;i<cart.length;i++){
      const id_produto = cart[i]._id;
      const quantidade = cart[i].quantidade;
      const bolosTeste = bolos.find(item => item._id === id_produto);
      const cafesTeste = cafes.find(item => item._id === id_produto);
      if(bolosTeste !== undefined){
        if(cafesTeste === undefined){
          if (items.size === counter){
            items.set(counter,[quantidade,{precoCentimos: (parseInt(bolosTeste.price)*100), nome: bolosTeste.name}])
            counter++
          }
        }
      } else if (cafesTeste !== undefined){
        if(bolosTeste === undefined){
          if(items.size === counter){
            items.set(counter,[quantidade,{precoCentimos:(parseInt(cafesTeste.price)*100),nome:cafesTeste.name}])
            counter++
          }
        }
      }
    }
    items.set(counter,[1,{precoCentimos:(parseFloat(precoEnvio)*100),nome:nomeEnvio}])
    const lineItems = Array.from(items.values()).map(([quantity, { precoCentimos, nome }]) => ({
      price_data: {
        currency: 'eur',
        product_data: {
          name: nome,
        },
        unit_amount: precoCentimos,
      },
      quantity: quantity,
    }));
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode:'payment',
      success_url:"http://localhost:3000/sucesso",
      cancel_url:"http://localhost:3000/semSucesso",
      line_items: lineItems
    })
    window.location.href = session.url;
;
    

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
        getTotal();
        setCartIsLoading(false);
      }
    } else { //se o cesto na bd estiver vazio
      setCartIsLoading(false);
    }
    if (cart.length>0){
      getTotal();
    }
    //console.log(cart);
  }, [cart, dbCart, email, bolos, cafes]);

  function handleQuantityChange(_id: any, value: string): void {
    updateCartData(email, _id, value);
    const foundItem = cart.find(item => item._id === _id);
    if (foundItem) {
      foundItem.quantidade = parseFloat(value);
      setCart([...cart]); // Update the cart state with the modified item
    }
    //add total up
    getTotal();
  }
  /**
   * Calculates the total amount
   */
  const getTotal = () => {
    let newTotal = 0;
    console.log("Cart in get total: ",cart);
    cart.forEach((item) => {
      if (item.price) {
        newTotal += parseFloat(item.price) * item.quantidade;
      }
    });
    setTotal(newTotal);
  }
  const handleOptionChange = (e) => {
    const optionValue = e.target.value;
    setSelectedOption(optionValue);
    let newTotal = total;
    let envio = "0";
    if (optionValue === 'Envio - Fornecedor (7 a 14 dias úteis)') {
      envio = "0";
      newTotal += parseFloat(envio);
    } else if (optionValue === 'Envio - CTT (4 a 7 dias úteis)') {
      envio = "2.99";
      newTotal += parseFloat(envio);
    } else if (optionValue === 'Envio - CTT Expresso (Dia Seguinte)') {
      envio = "4.99";
      newTotal += parseFloat(envio);
    }
  
    setvalorApos(newTotal);
    setNomeEnvio(optionValue);
    setPrecoEnvio(envio);
  };
  
  
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
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Spinner thickness='8px' speed='0.65s' emptyColor="#faf0e6"
                  color="#deb887" size='xl'
                />
              </div>
            ) : (
              cartIsEmpty ? null : (
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
          <Box>
            <Box margin="auto" minWidth="fit-content" width="auto">
                <Box minWidth="fit-content" width="0" bg="#faf0e6" margin="1rem" borderRadius="10px" display="flex" alignItems="center" justifyContent="space-between">
                <Box ml="1.5rem" fontWeight="semibold" as="h4" lineHeight="tight" width="60px" isTruncated>
                    Envio
                </Box>
                <Select required value={selectedOption} onChange={handleOptionChange}>
                    <option value="" disabled>Selecione</option>
                    <option value="Envio - Fornecedor (7 a 14 dias úteis)">Fornecedor (7 a 14 dias úteis) - Envio Gratuito</option>
                    <option value="Envio - CTT (4 a 7 dias úteis)">CTT (4 a 7 dias úteis) - 2,99€</option>
                    <option value="Envio - CTT Expresso (Dia Seguinte)">CTT Expresso (Dia Seguinte) - 4,99€</option>
                </Select>
                </Box>
            </Box>
            </Box>
            <Box margin="auto" minWidth="fit-content" width="auto">
                <Box minWidth="fit-content" width="0" bg="#faf0e6" margin="1rem" borderRadius="10px" display="flex" alignItems="center" justifyContent="space-between">
                <Box ml="1.5rem" fontWeight="semibold" as="h4" lineHeight="tight" isTruncated>
                    Total: {valorApos} €
                </Box>
                <Button ml="auto" bg="#deb887" margin="1rem" onClick={() => handlePayment()}>
                    Comprar
                </Button>
                </Box>
            </Box>
        </Box>
        </Box>
    </ThemeProvider>
  );
}