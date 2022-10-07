"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appDataSource = void 0;
const typeorm_1 = require("typeorm");
const Students_1 = require("./Entities/Students");
const Subjects_1 = require("./Entities/Subjects");
exports.appDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Sebastian03",
    database: "RegisterSubject",
    synchronize: true,
    logging: true,
    entities: [Students_1.Students, Subjects_1.Subject],
});
