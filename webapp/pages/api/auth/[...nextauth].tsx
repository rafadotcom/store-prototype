import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  
  secret: process.env.NEXTAUTH_SECRET, // Use environment variable for secret

  providers: [
    CredentialsProvider({

      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {


        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        let everythingFine = false
        let id
        let nome
        let NIF
        let dataNascimento
        let morada
        let telemovel
        let tipo

        await fetch("https://webstore-backend-nu.vercel.app/api/getUsers")
          .then((response) => response.json())
          .then((data) => {
            console.log(data.data[0].email)
            data.data.forEach(user => {

              if (user.email == email) {
                if (user.password == password) {
                  everythingFine = true
                  id = user.id
                  nome = user.nome
                  NIF = user.NIF
                  dataNascimento = user.dataNascimento
                  morada = user.morada
                  telemovel = user.telemovel
                  tipo = user.tipo
                }
                else {
                  throw new Error("invalid pasword");
                }
              }
            });
            if (!everythingFine)
              throw new Error("invalid credentials");
          });

        /* if (! await checkValidUser(email, password)) {
          throw new Error("invalid credentials");
        } */

        // if everything is fine
        return {
          id: id,
          email: email,
          name: nome + "," + NIF + "," + dataNascimento + "," + morada + "," + telemovel + "," + tipo,

        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
    // error: '/auth/error',
    // signOut: '/auth/signout'
  },
};


export default NextAuth(authOptions);
