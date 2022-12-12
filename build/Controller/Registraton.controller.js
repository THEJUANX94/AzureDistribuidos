"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubjectsByStudent = exports.getRegistration = exports.deleteRegistration = exports.getRegistrations = exports.createRegistration = void 0;
const redis_1 = require("redis");
const Registration_1 = require("../Entities/Registration");
const Students_1 = require("../Entities/Students");
const Subjects_1 = require("../Entities/Subjects");
const client = (0, redis_1.createClient)({
    url: 'redis://default:sUNCCLtMzr4e7Ca2K8ADSTn9TKc7uLPS@redis-16497.c282.east-us-mz.azure.cloud.redislabs.com:16497'
});
client.connect();
const createRegistration = async (req, res) => {
    try {
        const { id_Students, id_Subjects, Date } = req.body;
        const registration = new Registration_1.Registration();
        registration.id_Students = id_Students;
        registration.id_Subjects = id_Subjects;
        registration.Date = Date;
        await registration.save();
        console.log(registration);
        return res.json(registration);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.createRegistration = createRegistration;
const getRegistrations = async (req, res) => {
    try {
        const reply = await client.get("registrations");
        if (reply)
            return res.send(JSON.parse(reply));
        const registration = await Registration_1.Registration.find();
        const saveResult = await client.set("registrations", JSON.stringify(registration), {
            EX: 15,
        });
        console.log(saveResult);
        res.json(registration);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.getRegistrations = getRegistrations;
const deleteRegistration = async (req, res) => {
    try {
        const { Document_Student, Subjects_code } = req.body;
        const id_Students = await Students_1.Students.findOneBy({ Document: Document_Student });
        const id_Subjects = await Subjects_1.Subject.findOneBy({ SubjectCode: Subjects_code });
        if (id_Students && id_Subjects) {
            const id_Registration = await Registration_1.Registration.findOneBy({ id_Students: id_Students.id });
            const result = await Registration_1.Registration.delete({ id: id_Registration === null || id_Registration === void 0 ? void 0 : id_Registration.id });
            if (result.affected === 0) {
                return res.status(404).json({ message: 'User not found' });
            }
        }
        return res.sendStatus(204);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.deleteRegistration = deleteRegistration;
const getRegistration = async (req, res) => {
    try {
        const { id_Students } = req.params;
        const registration = await Registration_1.Registration.findOneBy({ id_Students: parseInt(id_Students) });
        return res.json(registration);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.getRegistration = getRegistration;
const getSubjectsByStudent = async (req, res) => {
    try {
        const { id_Students } = req.params;
        var subjectsName = [];
        const registratios = await Registration_1.Registration.findBy({ id_Students: parseInt(id_Students) });
        for (let index = 0; index < registratios.length; index++) {
            const subjects = registratios[index].id_Subjects;
            subjectsName[index] = await Subjects_1.Subject.findOneBy({ id: parseInt(subjects) });
        }
        return res.json(subjectsName);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.getSubjectsByStudent = getSubjectsByStudent;
