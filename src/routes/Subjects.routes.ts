import {Router} from 'express'
import {createSubject, deleteSubject, getSubject, getSubjects, UpdateSubject} from '../Controller/Subjects.controller'

const router = Router()
router.post("/subjects", createSubject)
router.get("/subjects", getSubjects)
router.put("/subjects/:id", UpdateSubject)
router.delete("/subjects/:id", deleteSubject)
router.get("/subjects/:id", getSubject)


export default router