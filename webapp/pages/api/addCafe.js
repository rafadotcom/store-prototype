import connect from "../../db/Connection";
import Cafe from "../../models/schemaCafe";

connect()

export default async function handler(req, res) {
    try {
        console.log(req.body)
        const cafe = await Cafe.create(req.body);
        res.redirect('/cafe')
        if (!cafe) {
            return res.json({ "code": 'User not created' })
        }
    } catch (error) {
        res.status(400).json({ status: 'Not able to create a new user.' })
    }
}