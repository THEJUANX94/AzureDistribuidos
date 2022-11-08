import { Router } from 'express';
import {signup, signin, profile} from '../Controller/Auth.controller'
import { TokenValidation } from "../libs/verifyToken";

const router = Router();

router.post('/signup', signup);
router.post('/signin', signin) ;

router.get('/profile', TokenValidation, profile);

export default router;