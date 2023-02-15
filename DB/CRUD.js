const connection = require('./db');
const path = require('path');

// Skills functions
const getSkill = (req, res) => {
  const name = req.params.skillName;
  connection.query('SELECT * FROM SkillsData WHERE skillName like ?', name + '%', (err, mysqlres) => {
    if (err) {
      res.status(400).send({ message: err });
      return;
    }

    if (mysqlres[0]) {
      res.render(path.join(__dirname, '../views/Skill-layout.pug'), {
        skillName: mysqlres[0]?.skillName,
        skillDes: mysqlres[0]?.skillDes,
        Workout: mysqlres[0]?.Workout,
        skillGoals: mysqlres[0]?.skillGoals,
        dishImg: mysqlres[0]?.dishImg,
        menuhref: mysqlres[0]?.menuhref,
      });
    } 
  });
};

const getAllSkills = async (req, res) => {
  connection.query('SELECT * FROM SkillsData', (err, mysqlres) => {
    if (err) {
      res.status(400).send({ message: err });
      return;
    }
    res.render(path.join(__dirname, '../views/Skill-layout.pug'), {
      beginners: mysqlres?.filter(({ yourLevel }) => yourLevel === 'Begginers') || [],
      intermediate: mysqlres?.filter(({ yourLevel }) => yourLevel === 'Intermediate') || [],
      advanced: mysqlres?.filter(({ yourLevel }) => yourLevel === 'Advanced') || [],
    });
  });
};
  
module.exports = { getSkill, getAllSkills};
