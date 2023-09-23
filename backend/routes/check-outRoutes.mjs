import {Router} from 'express'; 
import cors from "cors"; 
import {ObjectId} from "mongodb"; 

const router = Router(); 

router.post('/', async(req, res) => {
    console.log("hello world");
    res.sendStatus(204);
})


export default router;