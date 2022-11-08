"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const Auth_controller_1 = require("../Controller/Auth.controller");
const verifyToken_1 = require("../libs/verifyToken");
router.post('/signup', Auth_controller_1.signup);
router.post('/signin', Auth_controller_1.signin);
router.get('/profile', verifyToken_1.TokenValidation, Auth_controller_1.profile);
exports.default = router;