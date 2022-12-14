"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("../libs/multer"));
const Students_controller_1 = require("../Controller/Students.controller");
const router = (0, express_1.Router)();
router.post("/students", multer_1.default, Students_controller_1.createStudent);
router.get("/students", Students_controller_1.getStudents);
router.put("/students/:id", Students_controller_1.UpdateStudent);
router.delete("/students/:id", Students_controller_1.deleteStudent);
router.get("/students/:id", Students_controller_1.getStudent);
router.get("/Quemar", Students_controller_1.quemarEstudiantes);
exports.default = router;
