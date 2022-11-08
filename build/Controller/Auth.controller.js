"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.profile = exports.signin = exports.signup = void 0;
const Auth_1 = require("../Entities/Auth");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup = async (req, res) => {
    const { Mail, Password } = req.body;
    const user = new Auth_1.Authentication();
    user.Mail = Mail;
    if (req.body.passwordUser) {
        user.Password = await user.encryptPassword(Password);
    }
    await user.save();
    const token = jsonwebtoken_1.default.sign({ Mail: user.Mail }, process.env.TOKEN_SECRET || 'tokentest');
    res.header('auth_token', token).json(user);
};
exports.signup = signup;
const signin = async (req, res) => {
    try {
        if (req.body.mailUser && req.body.passwordUser) {
            const user = await Auth_1.Authentication.findOneBy({ Mail: req.body.Mail });
            if (!user)
                return res.status(400).json('Email or password is wrong');
            const correctPassword = await user.validatePassword(req.body.passwordUser);
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
