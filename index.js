const express = require('express');
const mysql = require('mysql');

//create connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nomysql'
})

//connect to mysql database

db.connect(err => {
    if(err) {
        throw err
    }
    console.log('Database connected successfully');
})

const app = express()

//create database
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nomysql'
    db.query(sql, err => {
        if(err) {
            throw err
        }
        res.send('Database created');
    });
});

//create database table
app.get('/createemployee', (req, res) => {
    let sql = 'CREATE TABLE employee(id int AUTO_INCREMENT, name VARCHAR(255), email VARCHAR(255), designation VARCHAR(255), PRIMARY KEY(id))'
    db.query(sql, err => {
        if(err) {
            throw err
        }
        res.send('Employee table created');
    });
});

//insert into employee table
app.get('/employee1', (req, res) => {
    let post = {name: 'John Doe', email: 'john@gmail.com', designation: 'Chief Manager'}
    let sql = 'INSERT INTO employee SET ?'
    let query = db.query(sql, post, err => {
        if(err) {
            throw err
        }
        res.send('Employee was added successfully')
    })
})

app.get('/getemployee', (req, res) => {
    let sql = 'SELECT * FROM employee'
    let query = db.query(sql, (err, results) => {
        if(err) {
            throw err
        }
        console.log(results)
        res.send('Employee table details fetched')
    })
})

//update employee table details
app.get('/updateemployee/:id', (req, res) => {
    let newName = 'updated name'
    let sql = `UPDATE employee SET name = '${newName}' WHERE id =  ${req.params.id}`
    let query = db.query(sql, err => {
        if(err) {
            throw err
        }
        res.send('Employee updated')
    })
})

//delete the employee
app.get('/deleteemployee/:id', (req, res) => {
    let sql = `DELETE FROM employee WHERE id = ${req.params.id}`
    let query = db.query(sql, err => {
        if(err) {
            throw err
        }
        res.send('Employee deleted successfully')
    })
})


app.listen('3000', () => {
    console.log('Server Started on port 3000')
})