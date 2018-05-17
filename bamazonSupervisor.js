var mysql = require("mysql");
var inquirer = require('inquirer');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "",
  database: "bamazon_db"
});

connection.connect(function(err) {
  if (err) {
    return console.log(err);
  }
  MainMenu();
});

function MainMenu(){
	inquirer.prompt([
    {
      name:"action",
      message:"Choose an option.",
      type: "list",
      choices :[
        "View Product Sales by Department",
        "Create New Department"
      ]
    }
  ])
		.then(function(answer){
			switch(answer.action){
				case 'View Product Sales by Department':
					viewProductSales();
					break;
				case 'Create New Department':
					createNewDept();
					break;
			}
		});
}

function viewProductSales() { 
	connection.query('SELECT department_id,department_name,over_head_costs,product_sales,product_sales - over_head_costs as total_profit FROM departments order by product_sales desc',function(err,results){
    console.log("Product sales by department");
    console.log("------------------");
    connection.query("SELECT * FROM departments", function(err, res) {
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].department_id + " | " + res[i].department_name + " |  $" + res[i].product_sales + " | $" + res[i].over_head_costs + " |" + res[i].total_profit);
        console.log("------------------");
      }
		connection.end();
    });
  });
}

function createNewDept(){
	inquirer.prompt([
    {
      name:"dept",
      message:"Enter Department name you'd like to create: "
    },
		{
      name:"costs",
      message:"Enter overhead costs of this department: ",
      validate: function(value){
							  if(parseFloat(value)>=0){
								return true;
							}
		}
	}])
		.then(function(answer){
				connection.query('INSERT INTO departments SET ?',{department_name: answer.dept, over_head_costs: answer.costs},function(err,results){
				if(err) throw err;
				console.log('');
				console.log('Successfully added new department to the table!');
				console.log('Rows affected :',results.affectedRows); 
				connection.end();
			
			});

	});
}
