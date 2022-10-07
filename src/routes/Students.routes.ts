import {Router} from 'express'
import {createStudent, deleteStudent, getStudent, getStudents, UpdateStudent} from '../Controller/Students.controller'

const router = Router()
router.post("/students", createStudent)
router.get("/students", getStudents)
router.put("/students/:id", UpdateStudent)
router.delete("/students/:id", deleteStudent)
router.get("/students/:id", getStudent)


export default router