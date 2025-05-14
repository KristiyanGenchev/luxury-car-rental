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
    const [formData, setFormData] = useState({ carBrand: '', carModel: '', year: '', pricePerDay: ''});


    useEffect(() => {
        console.log("Fetching cars...");
        fetch('/api/cars')
            .then(res => res.json())
            .then(data => {
                console.log("Received cars:", data);
                setCars(data);
            })
            .catch(err => {
            console.error("Fetch error:", err)
                alert("Error loading cars:" + err.message);
            });

    }, []);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch('/api/cars', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ carBrand: formData.carBrand, carModel: formData.carModel ,year: Number(formData.year), pricePerDay: Number(formData.pricePerDay) }),
        });
        setFormData({ carBrand: '', carModel: '', year: '', pricePerDay: '' });

        const updated = await fetch('/api/cars').then(res => res.json());
        setCars(updated);
    };


    <input
        name="carBrand"
        placeholder="Brand"
        value={formData.carBrand}
        onChange={handleChange}
    />




    return (
        <div className="p-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Car List</h1>
            <ul className="space-y-2 mb-6">
                {Array.isArray(cars) && cars.map(car => (
                    <li key={car.carId} className="bg-gray-100 p-3 rounded shadow">{car.carBrand} {car.carModel} ({car.year}) - ${car.pricePerDay}/day</li>
                ))}
            </ul>

            <form onSubmit={handleSubmit} className="space-y-3">
                <input
                    name="make"
                    placeholder="Make"
                    value={formData.carBrand}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
                <input
                    name="model"
                    placeholder="Model"
                    value={formData.carModel}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
                <input
                    name="year"
                    placeholder="Year"
                    type="number"
                    value={formData.year}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Add Car
                </button>
            </form>
        </div>
    );
}
