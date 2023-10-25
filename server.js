const express = require("express")

const app = express()
const PORT = 5000

app.use(express.json())
app.use("/api/auth", require("./myRoute"))
app.use("/api/models", require("./myRoute"))
const connectDB = require("./db");

//Connecting the Database
connectDB();

const server = app.listen(PORT, () =>
  console.log(`Server Connected to port ${PORT}`)
)
// Handling Error
process.on("unhandledRejection", err => {
  console.log(`An error occurred: ${err.message}`)
  server.close(() => process.exit(1))
})

