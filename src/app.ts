import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import path from 'path';
import studentsRoutes from './routes/Students.routes'
import subjectsRoutes from './routes/Subjects.routes'
import registrationRoutes from './routes/Registration.routes'
import authRoutes from "./routes/Auth.routes";
import router from './routes/Principal.routes'
import responseTime from "response-time";

const app = express() 

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())
app.use(responseTime())
app.use(studentsRoutes)
app.use(subjectsRoutes)
app.use(registrationRoutes)
app.use(authRoutes)
app.use(router)

app.use('/uploads', express.static(path.resolve('uploads')));
export default app