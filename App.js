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
exports.default = App;
const react_1 = require("react");
function App() {
    const [cars, setCars] = (0, react_1.useState)([]);
    const [formData, setFormData] = (0, react_1.useState)({ make: '', model: '', year: '' });
    (0, react_1.useEffect)(() => {
        console.log("Fetching cars...");
        fetch('http://localhost:3001/api/cars')
            .then(res => res.json())
            .then(data => {
            console.log("Received cars:", data);
            setCars(data);
        })
            .catch(err => console.error("Fetch error:", err));
    }, []);
    const handleChange = (e) => {
        setFormData(Object.assign(Object.assign({}, formData), { [e.target.name]: e.target.value }));
    };
    const handleSubmit = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        yield fetch('/api/cars', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Object.assign(Object.assign({}, formData), { year: Number(formData.year) })),
        });
        setFormData({ make: '', model: '', year: '' });
        const updated = yield fetch('/api/cars').then(res => res.json());
        setCars(updated);
    });
    return (<div className="p-6 max-w-xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Car List</h1>
            <ul className="space-y-2 mb-6">
                {cars.map(car => (<li key={car.id} className="bg-gray-100 p-3 rounded shadow">
                        {car.make} {car.model} ({car.year})
                    </li>))}
            </ul>

            <form onSubmit={handleSubmit} className="space-y-3">
                <input name="make" placeholder="Make" value={formData.make} onChange={handleChange} className="w-full p-2 border rounded"/>
                <input name="model" placeholder="Model" value={formData.model} onChange={handleChange} className="w-full p-2 border rounded"/>
                <input name="year" placeholder="Year" type="number" value={formData.year} onChange={handleChange} className="w-full p-2 border rounded"/>
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                    Add Car
                </button>
            </form>
        </div>);
}
