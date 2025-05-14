import React from 'react';
import { useEffect, useState } from 'react';

type Car = {
    carId: number;
    carBrand: string;
    carModel: string;
    year: number;
    pricePerDay: number;
};

export default function App() {
    const [cars, setCars] = useState<Car[]>([]);
    const [formData, setFormData] = useState({
        carBrand: '',
        carModel: '',
        year: '',
        pricePerDay: ''
    });

    useEffect(() => {
        fetch('/api/cars')
            .then(res => res.json())
            .then(data => {
                console.log('Received cars:', data);
                setCars(data);
            })
            .catch(err => {
                console.error('Fetch error:', err);
                alert('Error loading cars: ' + err.message);
            });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await fetch('/api/cars', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    carBrand: formData.carBrand,
                    carModel: formData.carModel,
                    year: Number(formData.year),
                    pricePerDay: Number(formData.pricePerDay)
                }),
            });

            setFormData({ carBrand: '', carModel: '', year: '', pricePerDay: '' });

            const updated = await fetch('/api/cars').then(res => res.json());
            setCars(updated);
        } catch (err) {
            console.error('Submit error:', err);
            alert('Failed to add car');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-4">
            <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">🚗 Car List</h1>

                <ul className="space-y-2 mb-6">
                    {cars.map((car: Car) => (
                        <li key={car.carId} className="bg-gray-100 p-3 rounded shadow">
                            {car.carBrand} {car.carModel} ({car.year}) - ${car.pricePerDay}/day
                        </li>
                    ))}
                </ul>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        name="carBrand"
                        placeholder="Brand"
                        value={formData.carBrand}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        name="carModel"
                        placeholder="Model"
                        value={formData.carModel}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        name="year"
                        placeholder="Year"
                        type="number"
                        value={formData.year}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <input
                        name="pricePerDay"
                        placeholder="Price per day"
                        type="number"
                        value={formData.pricePerDay}
                        onChange={handleChange}
                        className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-semibold"
                    >
                        ➕ Add Car
                    </button>
                </form>
            </div>
        </div>
    );
}
