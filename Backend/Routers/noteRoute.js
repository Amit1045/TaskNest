import express from "express"
import { getNotes,CreateNote,EditNote,DeleteNote,SearchNote } from "../Controller/controllerRoute.js"

const router=express.Router()

router.get("/",getNotes)
router.post("/create",CreateNote)
router.put("/edit/:id",EditNote)
router.delete("/delete/:id",DeleteNote)
router.get("/search",SearchNote)

export default router