import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import { Server } from 'socket.io';  // Correct import for Socket.IO
import searchRouter from './routes/search.js';
import registrationRoutes from './routes/registration.js';
import loginRoutes from './routes/login.js';
import dashboardRoutes from './routes/dashboard.js';
import dotenv from 'dotenv';
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);
const io = new Server(server);  // Create Socket.IO server instance

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Database connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Database connected!'))
  .catch((err) => console.error('Database connection error:', err));

// Routes
app.use('/',registrationRoutes);
app.use('/register', registrationRoutes);
app.use('/login', loginRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/search', searchRouter);

// Socket.io handling
io.on('connection', (socket) => {
  console.log('User connected');
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// Start the server
const PORT = process.env.PORT
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
