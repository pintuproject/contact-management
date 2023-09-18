import express from "express";
import {addContactController, deleteContactController, getContactController, updateContactController} from "../controller/contactController.js";

const router=express.Router();


 

router.post("/post",addContactController)
router.put("/update",updateContactController)
router.delete("/delete/:id",deleteContactController)
router.get("/get",getContactController)



 



export default router;
