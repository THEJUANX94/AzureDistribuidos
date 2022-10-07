"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStudent = exports.deleteStudent = exports.UpdateStudent = exports.getStudents = exports.createStudent = void 0;
const Students_1 = require("../Entities/Students");
const createStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Document, DocumentType, FirstName, LastName, state } = req.body;
        const student = new Students_1.Students();
        student.Document = Document;
        student.DocumentType = DocumentType;
        student.FirstName = FirstName;
        student.LastName = LastName;
        student.state = state;
        yield student.save();
        console.log(student);
        return res.json(student);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.createStudent = createStudent;
const getStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield Students_1.Students.find();
        return res.json(students);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getStudents = getStudents;
const UpdateStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { FirstName, LastName } = req.body;
        const student = yield Students_1.Students.findOneBy({ id: parseInt(req.params.id) });
        if (!student)
            return res.status(404).json({ message: 'user dont exists' });
        student.FirstName = FirstName;
        student.LastName = LastName;
        student.save();
        return res.json('recibido');
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.UpdateStudent = UpdateStudent;
const deleteStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield Students_1.Students.delete({ id: parseInt(id) });
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
});
exports.deleteStudent = deleteStudent;
const getStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const student = yield Students_1.Students.findOneBy({ id: parseInt(id) });
        return res.json(student);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getStudent = getStudent;
