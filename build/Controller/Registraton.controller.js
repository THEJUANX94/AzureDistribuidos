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
exports.getRegistration = exports.deleteRegistration = exports.getRegistrations = exports.createRegistration = void 0;
const Registration_1 = require("../Entities/Registration");
const createRegistration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_Students, id_Subjects, Date } = req.body;
        const registration = new Registration_1.Registration();
        registration.id_Students = id_Students;
        registration.id_Subjects = id_Subjects;
        registration.Date = Date;
        yield registration.save();
        console.log(registration);
        return res.json(registration);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.createRegistration = createRegistration;
const getRegistrations = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const registration = yield Registration_1.Registration.find();
        return res.json(registration);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getRegistrations = getRegistrations;
const deleteRegistration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_Students, id_Subjects } = req.params;
        const result = yield Registration_1.Registration.delete({ id_Students: parseInt(id_Students), id_Subjects: parseInt(id_Subjects) });
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
exports.deleteRegistration = deleteRegistration;
const getRegistration = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id_Students } = req.params;
        const registration = yield Registration_1.Registration.findOneBy({ id_Students: parseInt(id_Students) });
        return res.json(registration);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
});
exports.getRegistration = getRegistration;
