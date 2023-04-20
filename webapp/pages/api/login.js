import connect from '@/db/Connection';
import User from "@/models/schema"
import Cookies from "js-cookie";

connect()

export default async function handler(req, res) {

    const { email, password } = req.body
    const user = await User.findOne({ email, password })
    if (!user) {
        res.redirect('/registo')
    }
    else {
        // armazene os dados do usuário em um cookie
        Cookies.set("currentUser", user);
        res.redirect('/')
    }
}