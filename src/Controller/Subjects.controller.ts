import { Request, Response } from "express";
import { Subject } from '../Entities/Subjects'

export const createSubject = async (req: Request, res: Response) => {
    try {
        const { SubjectCode, Name, Credits, Slots, state } = req.body;
        const subject = new Subject()
        subject.SubjectCode = SubjectCode
        subject.Name = Name
        subject.Credits = Credits
        subject.Slots = Slots
        subject.state = state

        await subject.save()
        console.log(Subject)
        return res.json(Subject)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }

    }
}

export const getSubjects = async (req: Request, res: Response) => {
    try {
        const subject = await Subject.find()
        return res.json(subject);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export const UpdateSubject = async (req: Request, res: Response) => {
    try {
        const { Name, Credits } = req.body
        const subject = await Subject.findOneBy({ id: parseInt(req.params.id) })
        if (!subject) return res.status(404).json({ message: 'user dont exists' })
        subject.Name = Name
        subject.Credits = Credits;

        subject.save();
        return res.json('recibido')
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message })
        }
    }
}

export const deleteSubject = async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        const result = await Subject.delete({ id: parseInt(id) })

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

export const getSubject =async (req:Request, res: Response) => {
    try {
        const {id} = req.params
        const subject = await Subject.findOneBy({id: parseInt(id)})
        return res.json(subject)
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({message: error.message})
        }
    }
}