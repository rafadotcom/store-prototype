import connect from '@/db/Connection';
import Bolo from "@/models/schemaBolos"

connect()

export default async function handler(req, res) {
    
    console.log(await Bolo.find({}).then((result)=>{
        res.send(result);
    }).catch((err)=>{
        console.log(err);
    }))
        
}