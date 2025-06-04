const express = require('express');
const data = require('./data');
const validation = require('./validation');

const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/api/vehiculos', (req, res) => {
    data.selectAllVehicles((error, vehicles) => {
        if (error) {
            return res.status(500).json({error: 'Error al obtener vehículos'});
        }

        return res.json({data: vehicles});
    });
});

app.post('/api/vehiculos', (req, res) => {
    const vehicle = req.body;

    if (!validation.validateVehicle(vehicle)) {
        return res.status(400).json({error: 'Todos los campos son requeridos'});
    }

    data.saveVehicle(vehicle, (error, createdVehicle) => {
        if (error || !createdVehicle) {
            return res.status(500).json({error: 'Error al crear vehículo'});
        }

        return res.status(201).json({data: createdVehicle})
    })
});

app.put('/api/vehiculos/:id', (req, res) => {
    const {id} = req.params;
    const vehicle = req.body;

    if (!validation.validateVehicle(vehicle)) {
        return res.status(400).json({error: 'Todos los campos son requeridos'});
    }

    data.updateVehicle(id, vehicle, (error, updatedVehicle) => {
        if (error) {
            return res.status(500).json({error: 'Error al actualizar vehículo'});
        }

        if (!updatedVehicle) {
            return res.status(404).json({error: `Registro no encontrado`});
        }

        return res.status(200).json({data: updatedVehicle});
    })
});

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
