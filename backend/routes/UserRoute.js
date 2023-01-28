// const {Router} = require("express");
import express from "express";
// const { Register } = require("../controllers/UserController");
import { Login } from "../controllers/UserController.js"
// const router = Router()
const router = express.Router();

router.get('/login', Login)

// module.exports = router;
export default router;