"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStudent = exports.deleteStudent = exports.UpdateStudent = exports.getStudents = exports.createStudent = void 0;
const Students_1 = require("../Entities/Students");
const azure_storage_1 = __importDefault(require("azure-storage"));
const into_stream_1 = __importDefault(require("into-stream"));
const createStudent = async (req, res) => {
    var _a, _b;
    try {
        const blobService = azure_storage_1.default.createBlobService("DefaultEndpointsProtocol=https;AccountName=imagesdistribuidos;AccountKey=04FMn5l0Obo62znCyu5MkTNDacdQ5OnImHWigbfmNWE4fhXHRV4ifPaGQXjyFZQVrJOYCTgnsK9J+AStxOINAg==;EndpointSuffix=core.windows.net");
        const { Document, DocumentType, FirstName, LastName, state } = req.body;
        const student = new Students_1.Students();
        student.Document = Document;
        student.DocumentType = DocumentType;
        student.FirstName = FirstName;
        student.LastName = LastName;
        if (state == "true") {
            student.state = true;
        }
        else if (state == "false") {
            student.state = false;
        }
        if (req.file) {
            const getBlobName = (originalName) => {
                const identifier = Math.random().toString().replace(/0\./, '');
                return `${identifier}-${originalName}`;
            };
            const blobName = getBlobName(req.file.originalname);
            student.ImagePath = 'https://imagesdistribuidos.blob.core.windows.net/imagenes/' + blobName;
            const stream = (0, into_stream_1.default)((_a = req.file) === null || _a === void 0 ? void 0 : _a.buffer);
            const streamLength = (_b = req.file) === null || _b === void 0 ? void 0 : _b.buffer.length;
            blobService.createBlockBlobFromStream('imagenes', blobName, stream, streamLength, err => {
                if (err) {
                    console.log(err);
                    return;
                }
                res.status(200).json("Guardado correctamente");
            });
        }
        await student.save();
        console.log(student);
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
