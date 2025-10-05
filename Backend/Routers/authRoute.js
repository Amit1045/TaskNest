import express from "express";
import { LoginRoute, SignUpRoute } from "../Controller/controllerRoute.js";
const router = express.Router();

router.post("/login",LoginRoute)
router.post("/signup",SignUpRoute);



export default router;
