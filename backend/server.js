import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import connectDB from './config/db.js'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import mailingRoutes from './routes/mailingRoutes.js'

dotenv.config()

connectDB()

const app = express()

if (process.env_NODE_ENV === 'development') {
  app.use(morgan('dev'))
}

app.use(express.json()) //to accept json data in the body

app.get('/', (req, res) => {
  res.send('API is running...')
})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)
app.use('/api/mailing', mailingRoutes)

const __dirname = path.resolve() //cuerrent path
app.use('/uploads', express.static(path.join(__dirname, '/uploads'))) //make file static

app.use(notFound)
app.use(errorHandler)
const PORT = process.env.PORT || 5000
app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  )
)
