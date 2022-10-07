import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import studentsRoutes from './routes/Students.routes'
import subjectsRoutes from './routes/Subjects.routes'


const app = express() 

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

app.use(studentsRoutes)
app.use(subjectsRoutes)
export default app