import connect from '@/db/Connection';
import Cafe from "@/models/schemaCafe"

connect()

export default async function handler(req, res) {
    try{
        const cafes = await Cafe.find({});
        res.send({status: 'ok', data: cafes});

    }
    catch(error) {
        console.log(error);
    }
        
}