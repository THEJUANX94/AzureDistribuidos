"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Registration = void 0;
const typeorm_1 = require("typeorm");
const Students_1 = require("./Students");
const Subjects_1 = require("./Subjects");
let Registration = class Registration extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Registration.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Registration.prototype, "id_Students", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Registration.prototype, "id_Subjects", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Registration.prototype, "Date", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Students_1.Students),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Students_1.Students)
], Registration.prototype, "student", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Subjects_1.Subject, (subject) => subject.id),
    __metadata("design:type", Array)
], Registration.prototype, "subjects", void 0);
Registration = __decorate([
    (0, typeorm_1.Entity)('Registration')
], Registration);
exports.Registration = Registration;
