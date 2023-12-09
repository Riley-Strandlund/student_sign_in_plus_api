/*const express = require('express')
const app = express()
const server = app.listen(process.env.PORT || 3000, function() {
    console.log('Express server running on port ', server.address().port)
})*/
//The above is the minimum that is required to create and start a local server

const express = require('express')
const apiRoutes = require('./routes/api')//file path
const path = require('path') //path is used to join together different file paths

// Create web application server
const app = express()

//path below needs to be flexible relative to where the server.js folder is
const staticFIlePath = path.join(__dirname, 'client', 'dist')//base directory of project, client folder, dist folder. This line goes to the trunk of the project then joins together other folders to go up the branches to where the static files are.
const staticFiles = express.static(staticFIlePath)//Can serve everything in the staticFilePath as static files. Doesn't have to worry about non-static files.
app.use('/', staticFiles) //request to home page, serve static file - the Vue app index.html


app.use(express.json())

app.use('/api', apiRoutes) // apiRoutes is in a spot that requires 'middleware function'

app.use(function(req, res, next) {
    res.status(404).send('Sorry, page not found.')// if we have a regular request without err parameter and it doesn't work this path is called.
    //todo - can't find matching route
})

app.use(function(err, req, res, next) {// The parameter order is the only order it can be in so no errors occur. err can be omitted, but nothing else and order must be maintained.
    console.log(err)
    res.status(500).send('Server error')
})


// Start server running
const server = app.listen(process.env.PORT || 3000, function() {
    console.log('Express server running on port ', server.address().port)
})

