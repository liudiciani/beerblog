var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'lisa.iudiciani@gmail.com',
  password : 'Cupcake1!'
});
connection.connect();
module.exports = connection;