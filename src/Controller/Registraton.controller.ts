import { Request, Response } from "express";
import { createClient } from 'redis';
import { FindOperator } from "typeorm";
import { Registration } from '../Entities/Registration';
import { Students } from "../Entities/Students";
import { Subject } from "../Entities/Subjects";

const client = createClient({
    url: 'redis://default:sUNCCLtMzr4e7Ca2K8ADSTn9TKc7uLPS@redis-16497.c282.east-us-mz.azure.cloud.redislabs.com:16497'
});
client.connect();

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
        const reply = await client.get("registrations")
        if (reply) return res.send(JSON.parse(reply));

        const registration = await Registration.find()
        const saveResult = await client.set("registrations", JSON.stringify(registration),
            {
                EX: 15,
            }
        );
        console.log(saveResult)
        res.json(registration);

    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export const deleteRegistration = async (req: Request, res: Response) => {
    try {
        const { Document_Student, Subjects_code } = req.body

        const id_Students = await Students.findOneBy({ Document: Document_Student })
        const id_Subjects = await Subject.findOneBy({ SubjectCode: Subjects_code })

        if (id_Students && id_Subjects) {
            const id_Registration = await Registration.findOneBy({ id_Students: id_Students.id })
            const result = await Registration.delete({ id: id_Registration?.id })

            if (result.affected === 0) {
                return res.status(404).json({ message: 'User not found' })
            }
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

export const getSubjectsByStudent = async (req: Request, res: Response) => {
    try {
        const { id_Students } = req.params
        const reply = await client.get("SubjectsByStudent")
        if (reply) return res.send(JSON.parse(reply));

        var subjectsName: Subject[] = []
        const registratios = await Registration.findBy({ id_Students: parseInt(id_Students) })
        for (let index = 0; index < registratios.length; index++) {
            const subjects = registratios[index].id_Subjects
            subjectsName[index] = await Subject.findOneBy({ id: parseInt(subjects) }) as Subject
        }
        const saveResult = await client.set("SubjectsByStudent", JSON.stringify(subjectsName),
            {
                EX: 15,
            }
        );
        console.log(saveResult);
        return res.json(subjectsName)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
    }
}

export const getStudentsBySubject = async (req: Request, res: Response) => {
    try {
        const { id_Subject } = req.params
        const reply = await client.get("StudentsBySubject")
        if (reply) return res.send(JSON.parse(reply));

        var studentsName: Students[] = []
        const registratios = await Registration.findBy({ id_Subjects: id_Subject })
        for (let index = 0; index < registratios.length; index++) {
            const students = registratios[index].id_Students
            studentsName[index] = await Students.findOneBy({ id: students }) as Students
        }
        const saveResult = await client.set("StudentsBySubject", JSON.stringify(studentsName),
            {
                EX: 15,
            }
        );
        console.log(saveResult);
        return res.json(studentsName)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
    }
}