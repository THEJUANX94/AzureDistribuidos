"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = exports.signin = exports.signup = exports.seeRoles2 = exports.seeRoles1 = void 0;
const Auth_1 = require("../Entities/Auth");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const seeRoles1 = async (req, res) => {
    try {
        const students = await Auth_1.Authentication.delete({ Mail: "josemanuelpajarovargas@gmail.com" });
        return res.json(students);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.seeRoles1 = seeRoles1;
const seeRoles2 = async (req, res) => {
    try {
        const students = await Auth_1.Authentication.find();
        return res.json(students);
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
exports.seeRoles2 = seeRoles2;
const signup = async (req, res) => {
    const { Mail, Password, Roles } = req.body;
    const auth = new Auth_1.Authentication();
    auth.Mail = Mail;
    if (req.body.Password) {
        auth.Password = await auth.encryptPassword(Password);
    }
    const user = await Auth_1.Authentication.findOneBy({ Mail: req.body.Mail });
    await auth.save();
    const token = jsonwebtoken_1.default.sign({ Mail: auth.Mail }, process.env.TOKEN_SECRET || 'tokentest');
    res.header('auth_token', token).json(user);
};
exports.signup = signup;
const signin = async (req, res) => {
    try {
        if (req.body.Mail && req.body.Password) {
            const user = await Auth_1.Authentication.findOneBy({ Mail: req.body.Mail });
            if (!user)
                return res.status(400).json('Email or password is wrong');
            const correctPassword = await user.validatePassword(req.body.Password);
            const token = jsonwebtoken_1.default.sign({ Mail: user.Mail }, process.env.TOKEN_SECRET || 'tokentest', {
                expiresIn: 60 * 60 * 24
            });
            res.header('auth_token', token).json(user);
        }
    }
    catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        }
    }
};
exports.signin = signin;
const profile = async (req, res) => {
    const user = await Auth_1.Authentication.findOneBy({ Mail: req.body.Mail });
    if (!user)
        return res.status(400).json('No user found');
    res.json(user);
};
exports.profile = profile;
