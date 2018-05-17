
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

INSERT INTO products (product_name, department_name, price, quantity) 
VALUES
("paper", "office", "20", "100"),
("tape", "office", "5", "500"),
("water bottle", "sports", "15", "500"),
("chocolate", "food", "25", "75"),
("chips", "food", "4", "800"),
("running shoes", "sports", "200", "20"),
("cup", "home", "3", "100"),
("silverware", "home", "27", "100"),
("strawberries", "food", "5", "65"),
("dishwasher", "home", "800", "15")


CREATE TABLE departments (
department_id INT NOT NULL AUTO_INCREMENT,
department_name VARCHAR(100) NULL,
over_head_costs INTEGER (100) NULL,
product_sales INTEGER (100) NULL,
total_profit INTEGER (100) NULL,
PRIMARY KEY (department_id)
);

INSERT INTO departments (department_name, over_head_costs, product_sales, total_profit)
VALUES
("Electronics", "10000", "20000", "10000"),
("Clothing", "60000", "100000", "40000"),
("Home", "75000", "100000", "25000")


