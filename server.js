/*const express = require('express')
const app = express()
const server = app.listen(process.env.PORT || 3000, function() {
    console.log('Express server running on port ', server.address().port)
})*/
//The above is the minimum that is required to create and start a local server

const express = require('express')
const apiRoutes = require('./routes/api')//file path

// Create web application server
const app = express()

app.use(express.json())

app.use('/api', apiRoutes) // apiRoutes is in a spot that requires 'middleware function'

app.use(function(req, res, next) {
    res.status(404).send('Sorry, not found.')// if we have a regular request without err parameter and it doesn't work this path is called.
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

