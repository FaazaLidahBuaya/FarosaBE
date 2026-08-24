require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const installationRoutes = require('./routes/installationRoutes');
const cityRoutes = require('./routes/cityRoutes');
const packageRoutes = require('./routes/packageRoutes');
const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');
const staffChatRoutes = require('./routes/staffChatRoutes');
const userRoutes = require('./routes/userRoutes');
const activityLogRoutes = require('./routes/activityLogRoutes');
const { seedCities } = require('./controllers/cityController');
const { seedPackages } = require('./controllers/packageController');
const { seedEmployees } = require('./controllers/authController');
const { autoActivateInstallations } = require('./controllers/installationController');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/farosawifi')
.then(() => {
  console.log('MongoDB connected successfully');
  // Jalankan seeder
  seedCities();
  seedPackages();
  seedEmployees();
  // Jalankan pengecekan auto-activate setiap 1 menit (60000ms)
  setInterval(autoActivateInstallations, 60000);
  // Jalankan sekali saat start
  autoActivateInstallations();
})
.catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/installations', installationRoutes);
app.use('/api/cities', cityRoutes);
app.use('/api/packages', packageRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/staff-chat', staffChatRoutes);
app.use('/api/logs', activityLogRoutes);

// Base route
app.get('/', (req, res) => {
  res.send('Farosa API is running...');
});

if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;

