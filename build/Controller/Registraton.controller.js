"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRegistration = exports.deleteRegistration = exports.getRegistrations = exports.createRegistration = void 0;
const Registration_1 = require("../Entities/Registration");
const redis_1 = require("redis");
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
        const { id_Students, id_Subjects } = req.params;
        const result = await Registration_1.Registration.delete({ id_Students: parseInt(id_Students), id_Subjects: parseInt(id_Subjects) });
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
