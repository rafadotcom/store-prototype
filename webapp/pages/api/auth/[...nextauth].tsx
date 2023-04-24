import NextAuth, {NextAuthOptions} from 'next-auth'
import connect from '@/db/Connection';
import User from "@/models/schema"
import { IUser } from '@/types';
import CredentialsProvider from 'next-auth/providers/credentials'

const options : NextAuthOptions = {
    providers:[
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "teste"},
                password: {label: "Password", type: "test"}
            },
            async authorize(credentials: any) {
                await connect()

                const user = await User.findOne({
                    email: credentials?.email
                }).select("password")

                if (!user) {
                    throw new Error("Invalid credentials")
                }

                const isPasswordCorrect = (credentials!.password == user.password)

                if (!isPasswordCorrect) {
                    throw new Error("Invalid credentials")
                }

                return user
            }
        })

    ],
    pages: {
        signIn: "/login"
    },
    session: {
        strategy: "jwt"
    },
    callbacks: {
        jwt: async ({ token, user }) => {
            user && (token.user = user)
            return token
        },
        session: async ({ session, token }) => {
            const user = token.user as IUser
            session.user = user

            return session
        }
    }
}
export default NextAuth(options)
