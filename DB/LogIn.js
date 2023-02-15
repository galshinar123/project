const sql = require("./db");
const logIn = function(req,res){
    // Validate request
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    const userDtls = {
        "UserName": req.body.UserName,
        "UserPassword": req.body.UserPassword,
    };
    sql.query(`SELECT UserName, UserPassword from users where UserName = '${userDtls.UserName}' AND UserPassword = '${userDtls.UserPassword}'`, (err, mysqlres) => {
        if (err) {
            console.log("error: ", err);
            res.status(400).send({message: "Error in logging in: " + err});
            return;
        }
        if (mysqlres.length) {
            console.log("Logged in");
            res.render('Home-page', { message: "You have logged in successfully" });
            return;
        } else {
            res.status(401).send({message: "Invalid username or password"});
            return;
        }
    });
};

module.exports = {logIn};
