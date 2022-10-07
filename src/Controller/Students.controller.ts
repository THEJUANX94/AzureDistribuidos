import { Request, Response } from "express";
import { Students } from '../Entities/Students'

export const createStudent = async (req: Request, res: Response) => {
    try {
        const { Document, DocumentType, FirstName, LastName, state } = req.body;
        const student = new Students()
        student.Document = Document
        student.DocumentType = DocumentType
        student.FirstName = FirstName
        student.LastName = LastName
        student.state = state

        await student.save()
        console.log(student)
        return res.json(student)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }

    }
}

export const getStudents = async (req: Request, res: Response) => {
    try {
        const students = await Students.find()
        return res.json(students);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export const UpdateStudent = async (req: Request, res: Response) => {
    try {
        const { FirstName, LastName } = req.body
        const student = await Students.findOneBy({ id: parseInt(req.params.id) })
        if (!student) return res.status(404).json({ message: 'user dont exists' })
        student.FirstName = FirstName
        student.LastName = LastName;

        student.save();
        return res.json('recibido')
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
    }
}

export const deleteStudent = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const result = await Students.delete({ id: parseInt(id) })

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

export const getStudent =async (req:Request, res: Response) => {
    try {
        const {id} = req.params
        const student = await Students.findOneBy({id: parseInt(id)})
        return res.json(student)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message})
        }
    }
}