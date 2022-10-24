"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStudent = exports.deleteStudent = exports.UpdateStudent = exports.getStudents = exports.createStudent = void 0;
const Students_1 = require("../Entities/Students");
const createStudent = async (req, res) => {
    var _a, _b;
    try {
        const { Document, DocumentType, FirstName, LastName, state } = req.body;
        const student = new Students_1.Students();
        student.Document = Document;
        student.DocumentType = DocumentType;
        student.FirstName = FirstName;
        student.LastName = LastName;
        if ((_a = req.file) === null || _a === void 0 ? void 0 : _a.path) {
            student.ImagePath = (_b = req.file) === null || _b === void 0 ? void 0 : _b.path;
        }
        student.state = state;
        await student.save();
        console.log(student);
        return res.json(student);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.createStudent = createStudent;
const getStudents = async (req, res) => {
    try {
        const students = await Students_1.Students.find();
        return res.json(students);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.getStudents = getStudents;
const UpdateStudent = async (req, res) => {
    var _a, _b;
    try {
        const { FirstName, LastName } = req.body;
        const student = await Students_1.Students.findOneBy({ id: parseInt(req.params.id) });
        if (!student)
            return res.status(404).json({ message: 'user dont exists' });
        student.FirstName = FirstName;
        student.LastName = LastName;
        if ((_a = req.file) === null || _a === void 0 ? void 0 : _a.path) {
            student.ImagePath = (_b = req.file) === null || _b === void 0 ? void 0 : _b.path;
        }
        student.save();
        return res.json('recibido');
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.UpdateStudent = UpdateStudent;
const deleteStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await Students_1.Students.delete({ id: parseInt(id) });
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
exports.deleteStudent = deleteStudent;
const getStudent = async (req, res) => {
    try {
        const { id } = req.params;
        const student = await Students_1.Students.findOneBy({ id: parseInt(id) });
        return res.json(student);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.getStudent = getStudent;
