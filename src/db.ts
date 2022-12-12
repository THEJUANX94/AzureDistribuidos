import { DataSource } from "typeorm";
import { Students } from './Entities/Students'
import { Subject } from './Entities/Subjects'
import { Registration } from './Entities/Registration'
import { Authentication } from "./Entities/Auth";


export const appDataSource = new DataSource({
    type: "postgres",
    url: "postgres://db_inscriptionsorm_user:zr3aU5JxP2Az4OIXagszL8mlcq07eGxl@dpg-cebpmp4gqg4ap49i31tg-a.oregon-postgres.render.com/db_inscriptionsorm",
    synchronize: true,
    logging: true,
    extra: {
        ssl: {
            rejectUnauthorized: false
        },
    },
    entities: [Students, Subject, Registration, Authentication],
})