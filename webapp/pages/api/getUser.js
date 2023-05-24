import connect from "../../db/Connection";
import User from "../../models/schema";

connect()

export default async function handler(req, res) {
    const email = req.body
    try {
        const user = await User.find({ email }).select('email password');
        res.send({ status: 'ok', data: user });

    }
    catch (error) {
        console.log(error);
    }
}
