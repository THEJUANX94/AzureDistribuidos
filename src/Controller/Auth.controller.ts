import { Request, Response } from "express";
import { Authentication } from '../Entities/Auth';
import jwt from "jsonwebtoken";

export const signup = async (req: Request, res: Response) => {
    const { Mail, Password } = req.body;
    res.set('Access-Control-Allow-Origin', '*')
    const user = new Authentication();
    user.Mail = Mail;
    if (req.body.Password) {
        user.Password = await user.encryptPassword(Password);
    }

    await user.save();
    const token: string = jwt.sign({ Mail: user.Mail }, process.env.TOKEN_SECRET || 'tokentest');
    res.header('auth_token', token).json(user);
}

export const signin = async (req: Request, res: Response) => {
    try {
        if (req.body.Mail && req.body.Password) {
            const user = await Authentication.findOneBy({ Mail: req.body.Mail });
            if (!user) return res.status(400).json('Email or password is wrong');
            const correctPassword: boolean = await user.validatePassword(req.body.Password);
            const token: string = jwt.sign({ Mail: user.Mail }, process.env.TOKEN_SECRET || 'tokentest', {
                expiresIn: 60 * 60 * 24
            });
            res.header('auth_token', token).json(user);
        }

    } catch (error) {
        if (error instanceof Error) {
            return res.status(400).json({ message: error.message });
        }

    }
}

export const profile = async (req: Request, res: Response) => {
    const user = await Authentication.findOneBy({ Mail: req.body.Mail });
    if (!user) return res.status(400).json('No user found');
    res.json(user);
}