import express from "express";
// const {Router} = require("express");
// const { getToDo, saveToDo, updateToDo, deleteToDo, updateStatus } = require("../controllers/ToDoController");
import {getToDo, saveToDo, updateToDo, deleteToDo, updateStatus} from "../controllers/ToDoController.js"

// const router = Router()
const router = express.Router();

router.get('/', getToDo)
router.post('/save', saveToDo)
router.post('/status', updateStatus)
router.post('/update', updateToDo)
router.post('/delete', deleteToDo)

// module.exports = router;
export default router;