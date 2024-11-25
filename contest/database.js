// var mysql = require('mysql');
// var conn = mysql.createConnection({
//   host: 'root@127.0.0.1:3306', // assign your host name
//   user: 'root',      //  assign your database username
//   password: 'Saurabh@2003',      // assign your database password
//   database: 'voting' // assign database Name
// }); 
// conn.connect(function(err) {
//   if (err) throw err;
//   console.log('Database is connected successfully !');
// });
// module.exports = conn;

var mysql = require('mysql2');

var conn = mysql.createConnection({
  host: '127.0.0.1', // Assign only the host IP or hostname
  user: 'root',      // Assign your database username
  password: 'Saurabh@2003', // Assign your database password
  database: 'voting', // Assign your database name
  port: 3306          // Specify the port if needed (3306 is default for MySQL)
});

conn.connect(function(err) {
  if (err) {
    console.error('Error connecting to the database:', err.message);
    return;
  }
  console.log('Database is connected successfully!');
});

module.exports = conn;
