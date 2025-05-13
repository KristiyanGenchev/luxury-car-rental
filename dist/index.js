"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = require("./config/database");
const middlewares_1 = require("./common/middlewares");
const userRoutes_1 = require("./routes/userRoutes");
const carRoutes_1 = require("./routes/carRoutes");
const bookingRoutes_1 = require("./routes/bookingRoutes");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// Middlewares
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(middlewares_1.currentDateOfExecution); // custom middleware: logs current date
// Routes
app.use('/api/users', userRoutes_1.userRoutes);
app.use('/api/cars', carRoutes_1.carRoutes);
console.log(typeof carRoutes_1.carRoutes);
app.use('/api/bookings', bookingRoutes_1.bookingRoutes);
// 404 fallback for undefined routes
app.use((_req, res) => {
    res.status(404).json({ message: '❌ Route not found' });
});
// Start the app only if DB connection succeeds
database_1.db.init()
    .then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server started at http://localhost:${PORT}`);
    });
})
    .catch((err) => {
    console.error('❌ Database connection failed:', err);
    process.exit(1); // Exit process with failure code
});
console.log(typeof userRoutes_1.userRoutes); // трябва да е 'function'
console.log(userRoutes_1.userRoutes.name); // трябва да е 'router'
