// var express = require('express');
// var router = express.Router();
// var db=require('../database');
// var app = express();
// app.use(express.urlencoded());
// app.set('view engine', 'ejs');
// app.use(express.static('public'))
// app.use('/css',express.static(__dirname + 'public/css'))

// // to display registration form 
// router.get('/register', function(req, res, next) {
//   res.render('registration-form.ejs');
// });


// // to store user input detail on post request
// router.post('/register', function(req, res, next) {
    
//     inputData ={
//         first_name: req.body.first_name,
//         // last_name: req.body.last_name,
//         email_address: req.body.email_address,
//         // gender: req.body.gender,
//         password: req.body.password,
//         confirm_password:req.body.confirm_password
//     }
    
// // check unique email address

// var sql='SELECT * FROM registration WHERE email_address =?';
// db.query(sql, [inputData.email_address] ,function (err, data, fields) {
//  if(err) throw err
//  if(data.length>1){
//      var msg = inputData.email_address+ "was already exist";
 
//  }else if(inputData.confirm_password != inputData.password){
//     var msg ="Password & Confirm Password is not Matched";
//  }else{
     
//     // save users data into database
//     var sql = 'INSERT INTO registration SET ?';
//     console.log(sql);
//    db.query(sql, inputData, function (err, data) {
//       if (err) throw err;
//            });
//   var msg ="Your are successfully registered";
//  }
//  res.render('registration-form.ejs',{alertMsg:msg});
// })
     
// });
// module.exports = router;


var express = require('express');
var router = express.Router();
var db = require('../database');
// var bcrypt = require('bcrypt'); // Import bcrypt for password hashing

// To display registration form
router.get('/register', function (req, res, next) {
  res.render('registration-form.ejs');
});

// To store user input details on POST request
router.post('/register', async function (req, res, next) {
  const inputData = {
    first_name: req.body.first_name,
    email_address: req.body.email_address,
    password: req.body.password,
    confirm_password: req.body.confirm_password,
  };

  // Check if email already exists
  const sql = 'SELECT * FROM registration WHERE email_address = ?';
  db.query(sql, [inputData.email_address], async function (err, data, fields) {
    if (err) throw err;

    let msg;

    if (data.length >= 1) {
      msg = `${inputData.email_address} is already registered.`;
    } else if (inputData.confirm_password !== inputData.password) {
      msg = "Password and Confirm Password do not match.";
    } else {
      try {
        // Hash the password before saving
        // const hashedPassword = await bcrypt.hash(inputData.password, 10);

        // Save user data into the database
        const userData = {
          first_name: inputData.first_name,
          email_address: inputData.email_address,
          password: inputData.password,
        };

        const insertSql = 'INSERT INTO registration SET ?';
        db.query(insertSql, userData, function (err, result) {
          if (err) throw err;
          msg = "You have successfully registered!";
          res.render('registration-form.ejs', { alertMsg: msg });
        });
      } catch (hashErr) {
        console.error('Error hashing the password:', hashErr);
        msg = "An error occurred during registration. Please try again.";
        res.render('registration-form.ejs', { alertMsg: msg });
      }
      return;
    }

    // Render the form with an appropriate message
    res.render('registration-form.ejs', { alertMsg: msg });
  });
});

module.exports = router;
