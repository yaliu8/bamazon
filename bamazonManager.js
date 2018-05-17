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
  MainMenu();
});


// Main Menu Prompt
var MainMenu = function() {
  inquirer.prompt([
    {
      type: "list",
      message: "Hello Bamazon Manager! Please select what you'd like to do today:",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product",
        "Exit"
      ],
      name: "choice"
    }
  ]).then(function(res) {
    switch (res.choice) {
      case ("Exit"):
        connection.end();
        return;
      case ("View Products for Sale"):
        ProductsForSale();
        break;
      case ("View Low Inventory"):
        ViewLowInventory();
        break;
      case ("Add to Inventory"):
        AddInventory();
        break;
      case ("Add New Product"):
        AddNewProduct();
        break;
    }
  });

  // Function to list all items for sale
  function ProductsForSale() {
    console.log("Items up for sale");
    console.log("------------------");
    connection.query("SELECT * FROM products", function(err, res) {
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].item_id + " | " + res[i].product_name + " |  $" + res[i].price + " | " + res[i].quantity);
        console.log("------------------");
      }
      MainMenu();
    });
  }

  // Function allowing user to add inventory
  var AddInventory = function() {
    inquirer.prompt([
      {
        type: "input",
        message: "Please enter the Item ID of the product you would like to add more inventory to.",
        name: "item"
      }, {
        type: "input",
        message: "How many units would you like to add to this product?",
        name: "quantity"
      }
    ]).then(function(argument) {
      connection.query("SELECT quantity FROM products WHERE item_id = ?", [argument.item], function(err, res) {
        var numToAdd = parseInt(argument.quantity);
        var newInventory = parseInt(res[0].quantity) + numToAdd;

        if (err) {
          return console.log(err);
        }
        connection.query("UPDATE products SET quantity = ? WHERE item_id = ?", [newInventory, argument.item]);
        console.log(argument.quantity + "units added to inventory!");
        MainMenu();
      });
    });
  };

  // Function allowing user to add new product
  var AddNewProduct = function() {
    var departmentName = [
      "Food",
      "Home",
      "Office",
      "Sports",
      "Books",
      "Movies",
      "Music",
    ];
    inquirer.prompt([
      {
        type: "input",
        message: "Please enter the name of the item you would like to add.",
        name: "name"
      }, {
        type: "list",
        message: "Please enter the department you would to add it to.",
        choices: departmentName,
        name: "department"
      }, {
        type: "input",
        message: "Please enter the item's unit price.",
        name: "price"
      }, {
        type: "input",
        message: "Please enter the inventory quantity.",
        name: "inventory"
      }
    ]).then(function(item) {
      connection.query("INSERT INTO products SET ?", {
        product_name: item.name,
        department_name: item.department,
        price: item.price,
        quantity: item.inventory
      }, function(err, result) {
        if (err) {
          return console.log(err);
        }
        console.log("Item successfully added to products!");
        MainMenu();
      });
    });
  };

  // Function allowing manager to view low inventory (<5 quantity)
  var ViewLowInventory = function() {
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) {
        return console.log(err);
      }
      console.log("Low Inventory Items");
      console.log("----------------------");
      for (var j = 0; j < res.length; j++) {
        if (res[j].quantity < 5) {
          console.log(res[j].product_name + " | Units remaining: " + res[j].quantity);
        }
      }
      MainMenu();
    });
  };
};