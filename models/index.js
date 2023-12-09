// manage figuring out which database to use and connect to database using config.json. It also keeps track of the models the app uses, but in this app we only use student.js as a model

const { Sequelize, DataTypes } = require('sequelize')
const configJson = require('../config.json') // The '..' backs out of the folder to access either another folder or a file
const createStudentModel = require('./student.js') //So the '.' is to get a file within the same folder as this one

// look for an environment variable. It will be called NODE_ENV and read its value
// environment variables are set for your whole computer (or for a server)
// any application running on this computer (or server) can read these environment variables
// At Azure, we'll create an environment variable called NODE_ENV and set it to "production"
// if there is not NODE_ENV set, like locally on your computer, its value will be set to "development"
const env = process.env.NODE_ENV || 'development' 

const config = configJson[env] // read the configuration object for 'development' or 'production'

const sequelize = new Sequelize(config)

const database = {
    sequelize: sequelize, // setting up the database with the sequelize object that has the configuration on how to connect to the database
    Sequelize: Sequelize // Sequelize library
}//object

const studentModel = createStudentModel(sequelize, DataTypes) //gets the information from 'student.js'
const studentModelName = studentModel.name // 'Student'. Gets the model name which is 'Student' the name of the student template.
database[studentModelName] = studentModel // adds object to 'database'

module.exports = database
