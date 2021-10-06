const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mysql = require('mysql')
const cors = require('cors')
const config = require('./config.json')

const db = mysql.createPool({      
    host: config.host,             // connecting ...
    user: config.user,             // to ...
    password: config.password,     // our ...
    database: config.database      // database
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/get', (req, res)=> {

    const sqlInsert = "select * from persons"; // view all the information of the persons in our database
    db.query(sqlInsert, (err, result) => {
        res.send(result);
    });
});

app.post("/api/insert", (req, res) => {

    const firstName = req.body.firstName;   // first name to insert into the database
    const lastName = req.body.lastName;     // last name to insert into the database    
    const email = req.body.email;           // email to insert into the database    
            
    if (firstName.length > 0 && lastName.length > 0 && email.length > 0){ // make sure values are not null or empty
        console.log(firstName.length);
        const sqlInsert = "insert into persons (firstname, lastname, email) values (?,?,?)"; // insert query
        db.query(sqlInsert, [firstName, lastName, email], (err, result) => {
            console.log(result);
        });
    }
});


app.put("/api/update", (req, res) => {

    const beforeEdit = req.body.beforeEdit;  // email of the person before we update their info
    const firstName = req.body.firstName;    // first name to update into the database
    const lastName = req.body.lastName;      // last name to update into the database    
    const email = req.body.email;            // email to update into the database    

    const sqlUpdate = "update persons set firstName = ?, lastName = ?, email = ? where email = ?"; // update query
    db.query(sqlUpdate, [firstName, lastName, email, beforeEdit], (err, result) => {
        console.log(result);
    });

});


app.delete("/api/delete/:firstName", (req, res) => {

    const firstName = req.params.firstName;                        // first name of the person we want to delete from our database
    const sqlDelete = "delete from persons where firstName = ?";   // delete query

    db.query(sqlDelete, firstName, (err, result) => {
        console.log(result);
    });

});


app.listen(3001, () => {
    console.log("running on port 3001");
});