import {Router} from 'express'
import {createRegistration, getRegistrations, deleteRegistration, getRegistration} from '../Controller/Registraton.controller'

const router = Router()
router.post("/registration", createRegistration)
router.get("/registrations", getRegistrations)
router.delete("/registration/:id", deleteRegistration)
router.get("/registration/:id", getRegistration)


export default router