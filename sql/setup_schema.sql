CREATE DATABASE IF NOT EXISTS vehicles;

DROP USER IF EXISTS 'vehicles_admin'@'localhost';
CREATE USER IF NOT EXISTS 'vehicles_admin'@'localhost' IDENTIFIED BY 'vehicles_password';
GRANT ALL PRIVILEGES ON vehicles.* TO 'vehicles_admin'@'localhost';
FLUSH PRIVILEGES;

USE vehicles;

CREATE TABLE IF NOT EXISTS vehicles
(
    id               INT AUTO_INCREMENT PRIMARY KEY,
    marca            VARCHAR(100) NOT NULL,
    modelo           VARCHAR(100) NOT NULL,
    anio_fabricacion INT          NOT NULL,
    estado           VARCHAR(50)  NOT NULL
);
