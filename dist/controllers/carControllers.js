"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.carController = exports.CarController = void 0;
const database_1 = require("../config/database");
class CarController {
    createCar(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { carBrand, carModel, year, pricePerDay } = req.body;
            try {
                yield database_1.db.conn.query('INSERT INTO cars (carBrand, carModel, year, pricePerDay) VALUES (?, ?, ?, ?)', [carBrand, carModel, year, pricePerDay]);
                res.status(201).json({ message: '✅ Car added successfully' });
            }
            catch (error) {
                console.error('❌ Error creating car:', error);
                res.status(500).json({ message: 'Server error' });
            }
        });
    }
    getAllCars(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const [cars] = yield database_1.db.conn.query('SELECT * FROM cars');
                console.log('✅ Cars from DB:', cars);
                res.json(cars);
            }
            catch (error) {
                console.error('❌ Error fetching cars:', error); // ← това ще ни покаже истинската причина
                res.status(500).json({ message: 'Server error' });
            }
        });
    }
    getCarById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const [cars] = yield database_1.db.conn.query('SELECT * FROM cars WHERE carId = ?', [id]);
                if (cars.length === 0) {
                    res.status(404).json({ message: 'Car not found' });
                    return;
                }
                res.json(cars[0]);
            }
            catch (error) {
                console.error('❌ Error fetching car:', error);
                res.status(500).json({ message: 'Server error' });
            }
        });
    }
    updateCar(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { carBrand, carModel, year, pricePerDay } = req.body;
            try {
                const [result] = yield database_1.db.conn.query('UPDATE cars SET carBrand = ?, carModel = ?, year = ?, pricePerDay = ? WHERE carId = ?', [carBrand, carModel, year, pricePerDay, id]);
                if (result.affectedRows === 0) {
                    res.status(404).json({ message: 'Car not found' });
                    return;
                }
                res.json({ message: '✅ Car updated successfully' });
            }
            catch (error) {
                console.error('❌ Error updating car:', error);
                res.status(500).json({ message: 'Server error' });
            }
        });
    }
    deleteCar(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const [result] = yield database_1.db.conn.query('DELETE FROM cars WHERE carId = ?', [id]);
                if (result.affectedRows === 0) {
                    res.status(404).json({ message: 'Car not found' });
                    return;
                }
                res.json({ message: '🗑 Car deleted successfully' });
            }
            catch (error) {
                console.error('❌ Error deleting car:', error);
                res.status(500).json({ message: 'Server error' });
            }
        });
    }
}
exports.CarController = CarController;
exports.carController = new CarController();
