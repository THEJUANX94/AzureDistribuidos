"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appDataSource = void 0;
const typeorm_1 = require("typeorm");
const Students_1 = require("./Entities/Students");
const Subjects_1 = require("./Entities/Subjects");
exports.appDataSource = new typeorm_1.DataSource({
    driver: {
        type: "postgres",
        host: "ec2-3-214-2-141.compute-1.amazonaws.com",
        port: 5432,
        username: "vatsniztbslyfb",
        password: "d930b2a2e6b38b54ea3ef09b3099da223fe197f27dde238edcbffab859936411",
        database: "d70eoltrth87l2",
        synchronize: true,
        logging: true,
        extra: {
            ssl: {
                rejectUnauthorized: false
            },
        },
        entities: [Students_1.Students, Subjects_1.Subject],
    }
});
