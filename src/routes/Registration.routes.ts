import {Router} from 'express'
import {createStudent, deleteStudent, getStudent, getStudents, UpdateStudent} from '../Controller/Students.controller'

const router = Router()
router.post("/registration", createStudent)
router.get("/registrations", getStudents)
router.put("/registration/:id", UpdateStudent)
router.delete("/registration/:id", deleteStudent)
router.get("/registration/:id", getStudent)


export default router