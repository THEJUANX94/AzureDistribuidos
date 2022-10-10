import { Request, Response } from "express";
import { Registration } from '../Entities/Registration'

export const createRegistration = async (req: Request, res: Response) => {
    try {
        const { id_Students, id_Subjects, Date } = req.body;
        const registration = new Registration()
        registration.id_Students = id_Students
        registration.id_Subjects = id_Subjects
        registration.Date = Date

        await registration.save()
        console.log(registration)
        return res.json(registration)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }

    }
}

export const getRegistrations = async (req: Request, res: Response) => {
    try {
        const registration = await Registration.find()
        return res.json(registration);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export const deleteRegistration = async (req: Request, res: Response) => {
    try {
        const { id_Students, id_Subjects } = req.params

        const result = await Registration.delete({ id_Students: parseInt(id_Students), id_Subjects: parseInt(id_Subjects) })

        if (result.affected === 0) {
            return res.status(404).json({ message: 'User not found' })
        }
        return res.sendStatus(204)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }

    }
}

export const getRegistration = async (req: Request, res: Response) => {
    try {
        const { id_Students } = req.params
        const registration = await Registration.findOneBy({ id_Students: parseInt(id_Students) })
        return res.json(registration)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
    }
}