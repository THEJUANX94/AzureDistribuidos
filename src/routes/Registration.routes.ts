import {Router} from 'express'
import {createRegistration, getRegistrations, deleteRegistration, getRegistration, getSubjectsByStudent} from '../Controller/Registraton.controller'

const router = Router()
router.post("/registration", createRegistration)
router.get("/registrations", getRegistrations)
router.delete("/registration", deleteRegistration)
router.get("/registration/:id_Students", getRegistration)
router.get("/subjectsPerStudent/:id_Students", getSubjectsByStudent)


export default router