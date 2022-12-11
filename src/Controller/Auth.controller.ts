import { Request, Response } from "express";
import { Authentication } from '../Entities/Auth';
import jwt from "jsonwebtoken";
import { rol } from '../Entities/Role';

export const createRoles = async (req: Request, res: Response) => {
    try {
        const rol1 = new rol()
        const rol2 = new rol()
        const rol3 = new rol()
        rol1.name = 'user'
        rol2.name = 'moderator'
        rol3.name = 'admin'
        rol1.save()
        rol2.save()
        rol3.save()
        return res.json(rol3)
    } catch (error) {
        console.error(error);
    }
}

export const seeRoles1 = async (req: Request, res: Response) => {
    try {
        const students = await Authentication.delete({Mail: "josemanuelpajarovargas@gmail.com"})
        return res.json(students);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export const seeRoles2 = async (req: Request, res: Response) => {
    try {
        const students = await Authentication.find()
        return res.json(students);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
}

export const signup = async (req: Request, res: Response) => {
    const { Mail, Password, Roles } = req.body;
    const auth = new Authentication();
    auth.Mail = Mail;
    if (req.body.Password) {
        auth.Password = await auth.encryptPassword(Password);
    }
    const user = await Authentication.findOneBy({ Mail: req.body.Mail });
    if (Roles) {
        const foundRoles = await rol.find()
        auth.Roles = foundRoles.map(rol => rol.id)
    } else {
        auth.Roles = [3];
    }

    
    await auth.save();
    const token: string = jwt.sign({ Mail: auth.Mail }, process.env.TOKEN_SECRET || 'tokentest');
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