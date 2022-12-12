import { DataSource } from "typeorm";
import { Students } from './Entities/Students'
import { Subject } from './Entities/Subjects'
import { Registration } from './Entities/Registration'
import { Authentication } from "./Entities/Auth";


export const appDataSource = new DataSource({
    type: "postgres",
    url: "postgres://db_inscriptions_hafy_user:fcer4bUbQzhpE45ix5JW6yA2e5PLcHuE@dpg-ceb22firrk0bbtdldn8g-a.oregon-postgres.render.com/db_inscriptions_hafy",
    synchronize: true,
    logging: true,
    extra: {
        ssl: {
            rejectUnauthorized: false
        },
    },
    entities: [Students, Subject, Registration, Authentication],
})