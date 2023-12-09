module.exports = (sequelize, DataTypes) => {
    //defines our model
    const Student = sequelize.define('Student', {
        //define the columns in the database - give them a name, and a type
        name: {
            type: DataTypes.STRING,
            allowNull: false, //doesn't allow the name field of student to be empty/null
            validate: {
                notEmpty: false
            }
        },
        starID: {
            type: DataTypes.STRING,
            allowNull: false, //doesn't allow the starID field to be empty/null
            unique: true, //doesn't accept non-unique starID's
            validate: {
                notEmpty: false
            }
        },
        present: {
            type: DataTypes.BOOLEAN,
            allowNull: false, //doesn't allow the present field to be empty/null
            default: false //Sets default value to false instead of allowing it to be null
        }
    })

    // create or update table in the database
    Student.sync( { force: false } ).then( () => {
        console.log('Synced student table')
    })// Student.sync returns a promise that it will eventuall succeed or fail. 
    //The .then() executes on a positive return to excecute code within it. In this case its a console.log statement

    return Student //make available to whatever calls it
}



// if something in the student model is changed you need to restart it. You do this by changing 'force' in student sync to true
// then save it then change it back to false.