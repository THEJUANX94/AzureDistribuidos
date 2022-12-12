"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appDataSource = void 0;
const typeorm_1 = require("typeorm");
const Students_1 = require("./Entities/Students");
const Subjects_1 = require("./Entities/Subjects");
const Registration_1 = require("./Entities/Registration");
const Auth_1 = require("./Entities/Auth");
exports.appDataSource = new typeorm_1.DataSource({
    type: "postgres",
    url: "postgres://db_inscriptionsorm_user:zr3aU5JxP2Az4OIXagszL8mlcq07eGxl@dpg-cebpmp4gqg4ap49i31tg-a.oregon-postgres.render.com/db_inscriptionsorm",
    synchronize: true,
    logging: true,
    extra: {
        ssl: {
            rejectUnauthorized: false
        },
    },
    entities: [Students_1.Students, Subjects_1.Subject, Registration_1.Registration, Auth_1.Authentication],
});
