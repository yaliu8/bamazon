var mysql = require("mysql");
var inquirer = require("inquirer");

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
  queryBamazon();
});

// Listing items for sale
function queryBamazon() {
  console.log("Items up for sale");
  console.log("------------------");
  connection.query("SELECT * FROM products", function(err, res) {
    for (var i = 0; i < res.length; i++) {
      console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | Unit Price: $" + res[i].price + " | Units Remaining: " + res[i].quantity);
      console.log("------------------");
    }
    mainMenu();
  });
}

// Prompting user to make an action
var mainMenu = function() {
  inquirer.prompt([
    {
      type: "list",
      message: "Hello Customer! Welcome to Bamazon. Please select what you'd like to do today:",
      choices: ["Buy an Item", "Exit"],
      name: "choice"
    }
  ]).then(function(res) {
    switch (res.choice) {
      case ("Exit"):
        connection.end();
        return;
      case ("Buy an Item"):
        buyItem();
        break;
    }
  });
};

// Buy items function
var buyItem = function() {
  inquirer.prompt([
    {
      type: "input",
      message: "Please enter the item id of the product you would like to buy!",
      name: "item"
    }, {
      type: "number",
      message: "How many units of this item do you want to buy?",
      name: "quantity"
    }
  ]).then(function(argument) {

    connection.query("SELECT quantity, price, product_name FROM products WHERE item_id = ?", [argument.item], function(err, res) {
      var numSold = argument.quantity;
      var totalCost = res[0].price * numSold;
      var newQuantity = parseInt(res[0].quantity - numSold);
        if (err) {
        return console.log(err);
      }
      if (res[0].quantity < argument.quantity) {
        console.log("ERROR: Sorry, Insufficient store quantity. Your order cannot be placed.");
        nextOrder();
      } 
      else {
      connection.query("UPDATE products SET quantity = ? WHERE item_id = ?", [newQuantity, argument.item]);
      console.log("Your order for " + numSold + " units of " + res[0].product_name + " has been placed.");
      console.log("You spent $" + totalCost + " on your purchase.");
      console.log("Thank you for shopping with Bamazon. Please come again!");
      nextOrder();
      }
    });
  });
};

// Prompt new order
function nextOrder() {
  inquirer.prompt({
          name: 'choice',
          message: 'Would you like to place another order?',
          type: 'list',
          choices: ['Yes', 'No']
      })
      .then(function(answers) {
          if (answers.choice === 'Yes') {
              queryBamazon();
          } else {
              connection.end();
          }
      });
};
