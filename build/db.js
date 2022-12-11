"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appDataSource = void 0;
const typeorm_1 = require("typeorm");
const Students_1 = require("./Entities/Students");
const Subjects_1 = require("./Entities/Subjects");
const Registration_1 = require("./Entities/Registration");
const Auth_1 = require("./Entities/Auth");
const Role_1 = require("./Entities/Role");
exports.appDataSource = new typeorm_1.DataSource({
    type: "postgres",
    url: "postgres://db_inscriptions_hafy_user:fcer4bUbQzhpE45ix5JW6yA2e5PLcHuE@dpg-ceb22firrk0bbtdldn8g-a.oregon-postgres.render.com/db_inscriptions_hafy",
    synchronize: true,
    logging: true,
    extra: {
        ssl: {
            rejectUnauthorized: false
        },
    },
    entities: [Role_1.rol, Students_1.Students, Subjects_1.Subject, Registration_1.Registration, Auth_1.Authentication],
});
