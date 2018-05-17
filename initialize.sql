
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

