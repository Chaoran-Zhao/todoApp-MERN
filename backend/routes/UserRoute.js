// const {Router} = require("express");
import express from "express";
// const { Register } = require("../controllers/UserController");
import { Register } from "../controllers/UserController.js"
// const router = Router()
const router = express.Router();

router.post('/login', Register)

// module.exports = router;
export default router;