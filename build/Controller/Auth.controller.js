"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = exports.signin = exports.signup = exports.createRoles = void 0;
const Auth_1 = require("../Entities/Auth");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Role_1 = require("../Entities/Role");
const createRoles = async (req, res) => {
    try {
        const rol1 = new Role_1.rol();
        const rol2 = new Role_1.rol();
        const rol3 = new Role_1.rol();
        rol1.name = 'user';
        rol2.name = 'moderator';
        rol3.name = 'admin';
        rol1.save();
        rol2.save();
        rol3.save();
        console.log(rol1);
        return res.json(rol1);
    }
    catch (error) {
        console.error(error);
    }
};
exports.createRoles = createRoles;
const signup = async (req, res) => {
    const { Mail, Password, Roles } = req.body;
    const auth = new Auth_1.Authentication();
    auth.Mail = Mail;
    if (req.body.Password) {
        auth.Password = await auth.encryptPassword(Password);
    }
    const user = await Auth_1.Authentication.findOneBy({ Mail: req.body.Mail });
    if (Roles) {
        const foundRoles = await Role_1.rol.find();
        auth.Roles = foundRoles.map((rol) => rol.id);
    }
    else {
        // const role = await rol.findOneBy({name: "user"})
        // auth.Roles = [role.id];
    }
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
