# bamazon
## Introduction to bamazon
This CLI app is an online retailer-like storefront.

## Dependencies
* Node JS
* My SQL
* npm packages (included in package.json file): mysql (nmpm install mysql) inquirer (npm install inquirer)

## Getting Started
Initialize your local MySQL databse by importing the initialize.sql file into your database tool.

Type the following into to your CLI

``` node bamazonCustomer.js```

This displays the table called products. The sql scheme for the database and table is:
```
DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products (
item_id INT NOT NULL AUTO_INCREMENT,
product_name VARCHAR(100) NULL,
department_name VARCHAR(100) NULL,
price INTEGER (100) NULL,
quantity INTEGER (100) NULL,
PRIMARY KEY (item_id)
);
```

Mock data has been populated in the table with the following:
```
INSERT INTO products (product_name, department_name, price, quantity) values ("paper", "office", "20", "100");
INSERT INTO products (product_name, department_name, price, quantity) values ("tape", "office", "5", "500");
INSERT INTO products (product_name, department_name, price, quantity) values ("water bottle", "sports", "15", "500");
INSERT INTO products (product_name, department_name, price, quantity) values ("chocolate", "food", "25", "75");
INSERT INTO products (product_name, department_name, price, quantity) values ("chips", "food", "4", "800");
INSERT INTO products (product_name, department_name, price, quantity) values ("running shoes", "sports", "200", "20");
INSERT INTO products (product_name, department_name, price, quantity) values ("cup", "home", "3", "100");
INSERT INTO products (product_name, department_name, price, quantity) values ("silverware", "home", "27", "100");
INSERT INTO products (product_name, department_name, price, quantity) values ("strawberries", "food", "5", "65");
INSERT INTO products (product_name, department_name, price, quantity) values ("dishwasher", "home", "800", "15");

```
## Customer View

[Click to watch on GitHub] (https://github.com/yaliu8/bamazon/blob/master/ScreenRecordings/BamazonCustomer_ScreenRecording.mov)

The app prompts the customer to buy an item or exit. If the user chooses to buy an item they receive two messages:
1. To state the ID of the item they would like to buy
2. To state the quantity of the item they would like to buy

The results are
1. If there is enough quantity in stock relative to the customer's needs the order is processed and the total cost of the purchase is stated. The SQL table is then updated to reflect the new quantity remaining.
2. If there is not enough stock quantity, then the user is prompted with an "insufficient quantity" message and the transaction is ended.

## Manager View
[Click to watch on GitHub] (https://github.com/yaliu8/bamazon/blob/master/ScreenRecordings/BamazonManager_ScreenRecording.mov)

The app prompts the manager with a list of choices:
1. View all items for sale
2. View low inventory items (criteria here is < 5 units left)
3. Add to inventory
4. Add new product to database

## Supervisor View
[Click to watch on GitHub] (https://github.com/yaliu8/bamazon/blob/master/ScreenRecordings/BamazonSupervisor_ScreenRecording.mov)

New table created called departments. The sql scheme for the database and table is:
```
DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE departments (
department_id INT NOT NULL AUTO_INCREMENT,
department_name VARCHAR(100) NULL,
over_head_costs INTEGER (100) NULL,
product_sales INTEGER (100) NULL,
total_profit INTEGER (100) NULL,
PRIMARY KEY (item_id)
);
```

Mock data has been populated in the table with the following:
```
INSERT INTO departments (department_name, over_head_costs, product_sales, total_profit)
VALUES
("Electronics", "10000", "20000", "10000"),
("Clothing", "60000", "100000", "40000")
```
The app prompts the supervisor with a list of choices:

1. Vew product sales and profit by department
2. Create a new department


