const connection = require('./db');
const csv = require('csvtojson');
const path = require('path');

//function theat create the table

const CreateTables = (req, res) => {
    const Q1 =
      'CREATE TABLE SkillsData (skillName VARCHAR(50), skillDes VARCHAR(1000), Workout VARCHAR(200), skillGoals VARCHAR(100), skillimg VARCHAR(255), yourLevel VARCHAR(100)) ENGINE=InnoDB DEFAULT CHARSET=utf8';
    connection.query(Q1, (err, mysqlres) => {
      if (err) {
        console.log({ message: 'SkillData table not created', err });
        return;
      }
      console.log({ message: 'SkillData table created' });
    });
    res.send({ message: 'Done' });
  };
  
const dropTables = (req, res) => {
    const Q1 = 'DROP TABLE SkillData';
    connection.query(Q1, (err, mysqlres) => {
      if (err) {
        console.log({ message: 'SkillData table not deleted', err });
        return;
      }
      console.log({ message: 'SkillData table deleted' });
    });
    res.send({ message: 'Done' });
  };


const InsertData2DB = (req,res)=>{

  var Q1 = 'INSERT INTO SkillData SET ?';
  const SkillDataCsvFilePath = path.join(__dirname, 'SkillData.csv');
  csv()
    .fromFile(SkillDataCsvFilePath)
    .then(jsonObj => {
      console.log({ jsonObj }); // for learning perpose
      jsonObj.forEach(element => {
        var NewEntry = {
          skillName: element.skillName,
          skillDes: element.skillDes,
          Workout: element.Workout,
          skillGoals: element.skillGoals,
          skillimg: element.skillimg,
          yourLevel: element.yourLevel,
        };
        connection.query(Q1, NewEntry, (err, mysqlres) => {
          if (err) {
            console.log('error in inserting skills data', err);
          }
          console.log('created row sucssefuly ');
        });
      });
    });

  res.send('data inserted');
};


const showAll = (req,res)=>{
  const Q1 = "SELECT * FROM skillsData";
  connection.query(Q1, (err, mysqlres)=>{
      if (err) {
          console.log("error:", err);
          res.status(400).send({message: "error in selecting all skills " + err});
          return;
      };
      console.log("success in selecting all skills");
      res.send(mysqlres);
      return;
  })
};

module.exports = {CreateTables, InsertData2DB, dropTables, showAll };