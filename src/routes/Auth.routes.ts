import { Router } from 'express';
import { signup, signin, profile } from '../Controller/Auth.controller'
import { TokenValidation } from "../libs/verifyToken";
import { createRoles } from '../Controller/Auth.controller';

const router = Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/rol', createRoles);

router.get('/profile', TokenValidation, profile);

export default router;