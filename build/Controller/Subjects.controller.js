"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubject = exports.deleteSubject = exports.UpdateSubject = exports.getSubjects = exports.createSubject = void 0;
const Subjects_1 = require("../Entities/Subjects");
const createSubject = async (req, res) => {
    try {
        const { SubjectCode, Name, Credits, Slots, state } = req.body;
        const subject = new Subjects_1.Subject();
        subject.SubjectCode = SubjectCode;
        subject.Name = Name;
        subject.Credits = Credits;
        subject.Slots = Slots;
        subject.state = state;
        await subject.save();
        console.log(Subjects_1.Subject);
        return res.json(Subjects_1.Subject);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.createSubject = createSubject;
const getSubjects = async (req, res) => {
    try {
        const subject = await Subjects_1.Subject.find();
        return res.json(subject);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.getSubjects = getSubjects;
const UpdateSubject = async (req, res) => {
    try {
        const { Name, Credits } = req.body;
        const subject = await Subjects_1.Subject.findOneBy({ id: parseInt(req.params.id) });
        if (!subject)
            return res.status(404).json({ message: 'user dont exists' });
        subject.Name = Name;
        subject.Credits = Credits;
        subject.save();
        return res.json('recibido');
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.UpdateSubject = UpdateSubject;
const deleteSubject = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Subjects_1.Subject.delete({ id: parseInt(id) });
        if (result.affected === 0) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.deleteSubject = deleteSubject;
const getSubject = async (req, res) => {
    try {
        const { id } = req.params;
        const subject = await Subjects_1.Subject.findOneBy({ id: parseInt(id) });
        return res.json(subject);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.getSubject = getSubject;
