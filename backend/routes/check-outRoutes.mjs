import {Router} from 'express'; 
import cors from "cors"; 
import {ObjectId} from "mongodb"; 

const router = Router(); 

router.post('/', async(req, res) => {
    const checkedOutBooks = req.body; 

    try {
        const membersCollection = req.app.locals.members; 

        await members.Collection.insertOne({_id: new Object});
    } catch(error) {
        
    }
    res.sendStatus(204);
})


export default router;