import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import sslRedirect from 'heroku-ssl-redirect';
import studentsRoutes from './routes/Students.routes'
import subjectsRoutes from './routes/Subjects.routes'
import registrationRoutes from './routes/Registration.routes'


const app = express() 

app.use(morgan('dev'))
app.use(cors())
app.use(sslRedirect());
app.use(express.json())

app.use(studentsRoutes)
app.use(subjectsRoutes)
app.use(registrationRoutes)
export default app