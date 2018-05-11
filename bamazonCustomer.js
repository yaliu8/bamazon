var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "",
  database: "bamazon_db"
});

connection.connect(function(err)
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  
  connection.query ('SELECT * from products', function (err,res){
    if (err) throw err;
    console.log (JSON.stringify(res, null,2))
  })
});

