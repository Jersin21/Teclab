const express = require("express")
const cors = require("cors")
const db = require("./db/db")

const app = express()
require("dotenv").config()

async function conexion(){ 
   try {
    await db.authenticate()
    console.log("Conectado a la DB")
   } catch (error) {
     throw new Error(error)
   } 
}
conexion()
app.use(cors())
app.use(express.json())

const server = app.listen(process.env.PORT, () => {
    console.log(`Server Started in ${process.env.PORT}`)

})