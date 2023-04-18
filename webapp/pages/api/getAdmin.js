import connect from '@/db/Connection';
import Admin from "@/models/schema"

connect()

export default async function handler(req, res) {
    try{
        const admin = await Admin.find({});
        res.send({status: 'ok', data: admin});

    }
    catch(error) {
        console.log(error);
    }
        
}