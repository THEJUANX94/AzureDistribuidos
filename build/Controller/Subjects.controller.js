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
exports.getSubject = exports.deleteSubject = exports.UpdateSubject = exports.getSubjects = exports.createSubject = void 0;
const Subjects_1 = require("../Entities/Subjects");
const createSubject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { SubjectCode, Name, Credits, Slots, state } = req.body;
        const subject = new Subjects_1.Subject();
        subject.SubjectCode = SubjectCode;
        subject.Name = Name;
        subject.Credits = Credits;
        subject.Slots = Slots;
        subject.state = state;
        yield subject.save();
        console.log(Subjects_1.Subject);
        return res.json(Subjects_1.Subject);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.createSubject = createSubject;
const getSubjects = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const subject = yield Subjects_1.Subject.find();
        return res.json(subject);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getSubjects = getSubjects;
const UpdateSubject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { Name, Credits } = req.body;
        const subject = yield Subjects_1.Subject.findOneBy({ id: parseInt(req.params.id) });
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
});
exports.UpdateSubject = UpdateSubject;
const deleteSubject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const result = yield Subjects_1.Subject.delete({ id: parseInt(id) });
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
exports.deleteSubject = deleteSubject;
const getSubject = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const subject = yield Subjects_1.Subject.findOneBy({ id: parseInt(id) });
        return res.json(subject);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getSubject = getSubject;
