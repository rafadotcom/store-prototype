import connect from '@/db/Connection';
import User from "@/models/schema"
import { signIn } from "next-auth/react";


connect()

export default async function handler(req, res) {

    const { email, password } = req.body
    res = await signIn("credentials", {email, password})
    //const user = await User.findOne({ email, password })
    //if (!user) {
        //res.redirect('/registo')
    //}
    //else {
        //res.redirect('/')
    //}
}