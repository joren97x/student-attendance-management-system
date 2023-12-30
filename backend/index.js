import cors from 'cors'
import express from 'express'
import bodyParser from 'body-parser'
import router from './routes/index.js'

const app = express()
app.use(express.json())
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(router)
app.listen(5000, () => {
    console.log("Server running at http://localhost:5000")
})