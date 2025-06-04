function validateVehicle(vehicle) {
    return vehicle.marca && vehicle.modelo && vehicle.anio_fabricacion && vehicle.estado
}

module.exports = {
    validateVehicle
}