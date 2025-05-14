import { Router } from 'express';
import { carController, CarController } from '../controllers/carControllers';

export const carRoutes = Router();

carRoutes.get('/', carController.getAllCars);
carRoutes.get('/:id', carController.getCarById);
carRoutes.post('/', carController.createCar);
carRoutes.put('/:id', carController.updateCar);
carRoutes.delete('/:id', carController.deleteCar);

console.log('🚀 carRoutes file loaded');
console.log('📡 carRoutes loaded');
