import { useEffect, useState } from 'react';

type Car = {
    id: number;
    make: string;
    model: string;
    year: number;
};

export default function App() {
    const [cars, setCars] = useState<Car[]>([]);
    const [formData, setFormData] = useState({ make: '', model: '', year: '' });

    useEffect(() => {
        console.log("Fetching cars...");
        fetch('http://localhost:3001/api/cars')
            .then(res => res.json())
            .then(data => {
                console.log("Received cars:", data);
                setCars(data);
            })
            .catch(err => console.error("Fetch error:", err));
    }, []);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await fetch('/api/cars', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...formData, year: Number(formData.year) }),
        });
        setFormData({ make: '', model: '', year: '' });

        const updated = await fetch('/api/cars').then(res => res.json());
        setCars(updated);
    };

    return (
        <div className="p-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Car List</h1>
            <ul className="space-y-2 mb-6">
                {cars.map(car => (
                    <li key={car.id} className="bg-gray-100 p-3 rounded shadow">
                        {car.make} {car.model} ({car.year})
                    </li>
                ))}
            </ul>

            <form onSubmit={handleSubmit} className="space-y-3">
                <input
                    name="make"
                    placeholder="Make"
                    value={formData.make}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
                <input
                    name="model"
                    placeholder="Model"
                    value={formData.model}
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
