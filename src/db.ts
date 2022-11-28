import { DataSource } from "typeorm";
import { Students } from './Entities/Students'
import { Subject } from './Entities/Subjects'
import { Registration } from './Entities/Registration'
import { Authentication } from "./Entities/Auth";


export const appDataSource = new DataSource({
    type: "postgres",
    url: "postgres://db_inscriptions_user:34hHRYdm28KJtP3pmTslkJARoGsfWqD1@dpg-ce1vjcda4996ndu7oqsg-a.ohio-postgres.render.com/db_inscriptions",
    synchronize: true,
    logging: true,
    extra: {
        ssl: {
            rejectUnauthorized: false
        },
    },
    entities: [Students, Subject, Registration, Authentication],
})