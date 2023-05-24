import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import checkValidUser from "../checkValidUser";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({

      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {


        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        if (! await checkValidUser(email, password)) {
          throw new Error("invalid credentials");
        }

        // if everything is fine
        return {
          id: "1234",
          name: "John Doe",
          email: "john@gmail.com",
          role: "admin"
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
