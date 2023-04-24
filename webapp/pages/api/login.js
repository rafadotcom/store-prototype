import connect from '@/db/Connection';
import User from "@/models/schema"


connect()

export default async function handler(req, res) {

    const { email, password } = req.body
    const user = await User.findOne({ email, password })
    if (!user) {
        res.redirect('/registo')
    }
    else {
        res.redirect('/')
    }
}