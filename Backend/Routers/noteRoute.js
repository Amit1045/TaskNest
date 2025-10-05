import express from "express"
import { getNotes,CreateNote,EditNote,DeleteNote,SearchNote } from "../Controller/controllerRoute.js"
import { verifyToken } from "../middleware/Authmiddleware.js"

const router=express.Router()

router.get("/",verifyToken,getNotes)
router.post("/create",verifyToken,CreateNote)
router.put("/edit/:id",verifyToken,EditNote)
router.delete("/delete/:id",verifyToken,DeleteNote)
router.get("/search",SearchNote)

export default router