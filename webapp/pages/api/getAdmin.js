import connect from '@/db/Connection';
import User from "@/models/schemaAdmin"

connect()

export default async function handler(req, res) {
    console.log(await User.find({}).then((result)=>{
        res.send(result);
    }).catch((err)=>{
        console.log(err);
    }))



