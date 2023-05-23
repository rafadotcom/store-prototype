import connect from "@/db/Connection";
import { Bolo } from "@/models/schemaBolos";

connect()

export default async function handler(req, res) {
    try {
        console.log(req.body)
        const bolo = await Bolo.create(req.body);
        res.redirect('/bolos')
        if (!bolo) {
            return res.json({ "code": 'User not created' })
        }
    } catch (error) {
        res.status(400).json({ status: 'Not able to create a new user.' })
    }
}