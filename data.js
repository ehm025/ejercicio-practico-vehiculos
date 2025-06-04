const mysql = require("mysql2");

const pool = mysql.createPool({
    host: 'localhost',
    user: 'vehicles_admin',
    password: 'vehicles_password',
    database: 'vehicles'
});

function selectAllVehicles(callback) {
    pool.query('SELECT marca, modelo, anio_fabricacion, estado FROM vehicles', callback);
}

function saveVehicle(vehicle, callback) {
    pool.query(
        'INSERT INTO vehicles (marca, modelo, anio_fabricacion, estado) VALUES (?, ?, ?, ?)',
        [vehicle.marca, vehicle.modelo, vehicle.anio_fabricacion, vehicle.estado],
        (error, result) => {
            if (error) {
                callback(error, null);
                return;
            }

            const createdVehicle = {id: result.insertId, ...vehicle};
            callback(null, createdVehicle);
        }
    );
}

function updateVehicle(id, vehicle, callback) {
    pool.query(
        'UPDATE vehicles SET marca = ?, modelo = ?, anio_fabricacion = ?, estado = ? WHERE id = ?',
        [vehicle.marca, vehicle.modelo, vehicle.anio_fabricacion, vehicle.estado, id],
        (error, result) => {
            if (error) {
                callback(error, null);
                return;
            }

            if (result.affectedRows === 0) {
                callback(null, null);
                return;
            }

            const updatedVehicle = {id, ...vehicle};
            callback(null, updatedVehicle);
        }
    );
}

module.exports = {
    selectAllVehicles,
    saveVehicle,
    updateVehicle
}
