import connect from "../../db/Connection";
import User from "../../models/schema";

connect()

export default async function handler(req, res) {
    try {
        const users = await User.find({}).select('email password');
        res.send({ status: 'ok', data: users });

    }
    catch (error) {
        console.log(error);
    }
}
