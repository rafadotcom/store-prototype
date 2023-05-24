import connect from "../../db/Connection";
import Bolo from "../../models/schemaBolos";

connect()

export default async function handler(req, res) {
    try {
        const bolos = await Bolo.find({});
        res.send({ status: 'ok', data: bolos });

    }
    catch (error) {
        console.log(error);
    }

}