const express = require("express")
const cors = require("cors")
const userRoutes = require("./routes/userRoutes")

const app = express()
require("dotenv").config()


app.use(cors())
app.use(express.json())

app.use("/api/auth", userRoutes)

const server = app.listen(process.env.PORT, () => {
    console.log(`Server Started in ${process.env.PORT}`)

})