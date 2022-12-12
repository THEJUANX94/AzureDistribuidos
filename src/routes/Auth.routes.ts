import { Router } from 'express';
import { signup, signin, profile, seeRoles1, seeRoles2 } from '../Controller/Auth.controller'
import { TokenValidation } from "../libs/verifyToken";

const router = Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/seeRoles1', seeRoles1)
router.get('/seeRoles2', seeRoles2)

router.get('/profile', TokenValidation, profile);

export default router;