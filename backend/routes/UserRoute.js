// const {Router} = require("express");
import express from "express";
// const { Register } = require("../controllers/UserController");
import { Login, getUser } from "../controllers/UserController.js"
import { verifyToken } from "../middleware/auth.js";
// const router = Router()
const router = express.Router();

router.post('/login', Login)
router.get("/:name", verifyToken, getUser);
// module.exports = router;
export default router;