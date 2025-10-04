import express from "express";
import { LoginRoute, LogoutRoute, SignUpRoute } from "../Controller/controllerRoute";
import Authmiddleware from '../middleware/Authmiddleware.js'
const router = express.Router();

router.post("/login", Authmiddleware,LoginRoute)
router.post("/signup",SignUpRoute);
router.post("/logout",Authmiddleware,LogoutRoute)

export default router;
