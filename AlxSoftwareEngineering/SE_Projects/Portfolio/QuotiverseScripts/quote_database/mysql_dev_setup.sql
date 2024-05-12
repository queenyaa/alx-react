-- Set up the database environment for Quotiverse
CREATE DATABASE IF NOT EXISTS 'quotiverse_db';
CREATE USER IF NOT EXISTS 'quote_dev'@'localhost' IDENTIFIED BY 'Quotiv1@2';
GRANT ALL PRIVILEGES ON quotiverse_db.* TO 'quote_dev'@'localhost';
GRANT SELECT ON performance_schema.* TO 'quote_dev'@'localhost';
FLUSH PRIVILEGES;