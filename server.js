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

// Database connection handler for serverless & local
let isConnected = false;
const connectDB = async () => {
  if (isConnected || mongoose.connection.readyState === 1) {
    return;
  }
  
  const uri = process.env.MONGODB_URI || 'mongodb+srv://fazaachmad2000_db_user:AM62mTwijhZ4zQRb@cluster0.1nyc9vn.mongodb.net/farosawifi?retryWrites=true&w=majority&appName=Cluster0';

  await mongoose.connect(uri);
  isConnected = true;
  console.log('MongoDB connected successfully');
  
  // Seed initial data
  try {
    await seedCities();
    await seedPackages();
    await seedEmployees();
    await autoActivateInstallations();
  } catch (e) {
    console.log('Seeder note:', e.message);
  }
};

// Ensure DB is connected before handling any API request
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    console.error('Database connection error:', err.message);
    res.status(500).json({ error: 'Database connection failed', details: err.message });
  }
});

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

// Auto-activate interval only for continuous local server
if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
  setInterval(autoActivateInstallations, 60000);
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
