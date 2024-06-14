//imports
const { config } = require("dotenv")
const express = require("express")
const userRoutes = require("./src/routes/userRoutes")
const superHeroRoutes = require("./src/routes/superHeroRoutes")
const dealershipRoutes = require("./src/routes/dealershipRoutes")
const sessionRoutes = require("./src/routes/sessionRoutes")
const authRoutes = require("./src/routes/authRoutes")

const bodyParser = require("body-parser")
require('dotenv').config();

//consts
const PORT = process.env.PORT || 3002
const app = express()

//Middleware para permitir enviar solicitudes a thunderClient o postman
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

//ruta estatica para almacenar imagenes
app.use(express.static('uploads'))

//Middleware para acceder a rutas
app.use('/users', userRoutes)
app.use('/superheroes', superHeroRoutes)
app.use('/dealerships', dealershipRoutes)
app.use('/auth', authRoutes)
app.use('/sessions', sessionRoutes)



app.listen(PORT, () =>{
    console.log(`Connection to port ${PORT}`)
})