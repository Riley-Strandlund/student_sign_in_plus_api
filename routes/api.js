const express = require('express')
const database = require('../models/index') //will require the index.js file from this directory
const Student = database.Student // the student model from the model folder and file student.js

const router = express.Router()

router.get('/students', function(req, res, next) {
    //query database and get all rows from DB
    //convert to json form
    //available in the then function
    Student.findAll( {order: ['name'] }).then(students => {
        return res.json(students)
    })
})// Don't forget that the URL is based off of the first item in the router.get() parentheses which is '/students'


router.post('/students', function(req, res, next) {
    const newStudent = req.body
    console.log(newStudent)
    Student.create(newStudent).then( result => {
        return res.status(201).send('New student created!') // Status codes for HTTP: 200 = ok; 201 = created; 404 = not found; 500 = server error
    }).catch( err => {//if this catch wasn't here everytime invalid data is entered the server will crash.
        // 400 = bad request - client is sending a request the server can't fulfill
        if (err instanceof database.Sequelize.ValidationError) {
            const messages = err.errors.map( e => e.message)//errors is an array lets go through every error in the errors array and store the error message in message
            return res.status(400).json(messages)
        }else{
            // some other error?
            next(err)// next passes an issue on that a function can't to server.js
        }
    })
})// We test this post request without creating a form by using HTTPIE. 

// Use a GET request using HTTPIE to test site and see if it returns the status code:
// First you create a new collection and give it an appropriate name.
// Second click the '+' while hovering the collection to create a 'get' request.
// Third while the server is running you insert the localhost url into the 'get' request and receive the responses.

// Use a POST request USING HTTPIE to test entering things into the database:
// Click '+' again on the collection that was created
// Use the same localhost url, and to the left of the url change  GET to POST
// Go to 'Headers' and set name = 'Content-Type' and value = 'Application/JSON'
// Then select Body and at the bottom of the window change the Body to 'text' at the bottom drop down menu
// Set the value in this way 
        /*{
        "name": "A. Student",
        "starID": "aa1234aa"
        }*/
// The 'name' and 'starID' should be the same as in the student.js model/template
// After sending the POST request go to the previous GET request and send again to see the posted data
// After recieving the GET request and confirming the data go to DB Browser SQlite and open by selecting the student.sqlite file to confirm it's in there.

router.patch('/students/:id', function(req, res, next) {//the colon in the /students/:id turns it into a placeholder
    // match requests to /students/1
    // students/2, students/.etc
    // req.params stores the id value
    //stores any placeholders in the URL
    const studentID = req.params.id //the '.id' gets its value from the URL placeholder
    const updatedStudent = req.body //updated data about this student
    console.log(updatedStudent)
    Student.update( updatedStudent, { where: { id: studentID } }).then( ( result ) => {// The 'where' in the statement is just like a sql query "where id = studentID make changes"
       
        const rowsModified = result[0]
        //if 1 row was changed, we found student and they were updated
        if (rowsModified === 1) {
            return res.send('OK')// status is 200 by default
        }
        // student id that doesn't exist
        else {
            //if 0 rows were updated, student was not found
            return res.status(404).send('Student not found')
        }
    }).catch(err => { // database error - can't connect , or database reports error
        // 400 = bad request - client is sending a request the server can't fulfill
        if (err instanceof database.Sequelize.ValidationError) {
            const messages = err.errors.map( e => e.message)
            return res.status(400).json(messages)
        }else{
            // some other error? - can't connect to database
            next(err)
        }
    })//The above handles all general changes to the student objects, but if done in the browser there is only the boolean to change.
})   
//when patching using HTTPie make sure you are not patching the same boolean as is already in the database b/c it creates an error

    // what kind of errors could we see?
    // stuent id that doesn't exist
    // invalid data in the updatedStudent - eg. no name
    // database problems - app can't connect to the database


router.delete('/students/:id', function(req, res, next) {
    //delete request to /api/students/4 will delete student with id = 4
    const studentID = req.params.id
    Student.destroy( { where: { id: studentID } } ).then( (rowsDeleted) => {
        if (rowsDeleted === 1) {
            return res.send('Student deleted')
        } else { // 0 rows deleted - the student with this id is not in the database
            return res.status(404).send('Student not found')
        }
    }).catch( err => {
        return next(err)
    })
})//handles the deletion of selected students



module.exports = router //makes it available to rest of project. 
//Got an error about needing middleware but getting an object because 's' at the end 'module.exports' was excluded. it errored where we were trying to call the api file in server.js






