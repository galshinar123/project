const express = require('express');
const app = express();
const pug = require('pug');
const path = require('path');
const bodyParser = require('body-parser');
const {getSkill, getAllSkills} = require ('./DB/CRUD');
const connection = require('./DB/db');
const createDB = require('./DB/createDB');
const SignUp = require("./DB/signUp");
const LogIn = require("./DB/LogIn");

// parse requests of contenttype: application/json
app.use(bodyParser.json());
// parse requests of contenttype: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true
}));

// Set views path
app.set('views', path.join(__dirname, 'Views'));
// Set public path
app.use(express.static(path.join(__dirname, 'Static')));
// Set pug as view engine
app.set('view engine', 'pug');

app.get('/Home-page', (req, res) =>{
    res.render('Home-page');
})

app.get('/Log-in', (req, res) =>{
    res.render('Log-in');
})

app.get('/Sign-up', (req, res) =>{
    res.render('Sign-up');
})

app.get('/Skills-status', (req, res) =>{
    res.render('Skills-status');
})

app.get('/Menu', (req, res) =>{
    res.render('Menu');
})

app.get('/Beginners', getAllSkills);

app.get('/Intermediate', getAllSkills);

app.get('/Advanced',  getAllSkills);


// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

app.post('/SignUp',SignUp.signUp);
app.post('/LogIn',LogIn.logIn);
app.get('/:skillName',getSkill );

app.get('/CreateTables', createDB.CreateTables);
app.get('/DropTables', createDB.dropTables);
app.get('/InsertDataToTables', createDB.InsertData2DB);
app.get('/showAll', createDB.showAll);

app.get("/getUsers", (req, res)=>{
    let q = "SELECT * FROM users";
    connection.query(q, (err, mysqlres)=>{
        if(err) {
            throw err;
        return;}
        console.log("got all users");
        res.send(mysqlres);
        return;
    })
  });

