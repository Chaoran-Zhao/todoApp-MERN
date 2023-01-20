const {Router} = require("express");
const { getToDo, saveToDo, updateToDo, deleteToDo, updateStatus } = require("../controllers/ToDoController");

const router = Router()

router.get('/', getToDo)
router.post('/save', saveToDo)
router.post('/status', updateStatus)
router.post('/update', updateToDo)
router.post('/delete', deleteToDo)

module.exports = router;