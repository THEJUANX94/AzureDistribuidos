import { DataSource } from "typeorm";
import { Students } from './Entities/Students'
import { Subject } from './Entities/Subjects'
import { Registration } from './Entities/Registration'
import { Authentication } from "./Entities/Auth";


export const appDataSource = new DataSource({
    type: "postgres",
    host: "ec2-3-214-2-141.compute-1.amazonaws.com",
    port: 5432,
    username: "vatsniztbslyfb",
    password: "d930b2a2e6b38b54ea3ef09b3099da223fe197f27dde238edcbffab859936411",
    database: "d70eoltrth87l2",
    synchronize: true,
    logging: true, 
    extra:{
        ssl:{
            rejectUnauthorized: false
        },
    },
    entities: [Students, Subject, Registration, Authentication],
})