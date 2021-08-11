// Importing mongoose package
const mongoose = require('mongoose')

// setting up a constant to connect to our database with the DB_STRING
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
// confirm connection if successful 
    console.log(`MongoDB Connected: ${conn.connection.host}`)
// throw error if anything goes wrong or not connected
  } catch (err) {
    console.error(err)
// process.exit instructs node.js to terminate the process synchronously an exit status code
    process.exit(1)
  }
}
// export this function to re-use and import elsewhere
module.exports = connectDB
