const logActivity = require('../utils/logger');
const Package = require('../models/Package');

const initialPackages = [
  // 3 Standar Pilihan dari Homepage
  { name: '20 Mbps', speed: 20, price: 250000, category: 'Internet', badge: '', features: ['Unlimited Kuota', 'Free Pemasangan', 'Router WiFi 5', 'Ideal untuk 3-5 Perangkat'] },
  { name: '50 Mbps', speed: 50, price: 350000, category: 'Internet', badge: 'Paling Populer', features: ['Unlimited Kuota', 'Free Pemasangan', 'Router WiFi 6', 'Ideal untuk 5-10 Perangkat', 'Prioritas Support'] },
  { name: '100 Mbps', speed: 100, price: 500000, category: 'Internet', badge: '', features: ['Unlimited Kuota', 'Free Pemasangan', 'Router WiFi 6 Pro', 'Ideal untuk >10 Perangkat', 'Prioritas Support VIP'] },
  
  // Paket Promo / Entertainment
  {
    name: 'Bayar Sekaligus - 200 Mbps Internet',
    speed: 75,
    price: 240000,
    category: 'Promo',
    badge: '',
    features: ['Sudah termasuk berlangganan Vision+, Viu, Prime Video']
  },
  {
    name: 'Double Speed - 200 Mbps Internet+Movie',
    speed: 75,
    price: 270000,
    category: 'Internet + Movie',
    badge: '',
    features: ['Sudah termasuk berlangganan Netflix Basic Movie']
  },
  {
    name: 'Bayar Sekaligus - 300 Mbps Internet',
    speed: 100,
    price: 270000,
    category: 'Promo',
    badge: '',
    features: ['Sudah termasuk berlangganan Vision+, Viu, Prime Video']
  },
  {
    name: 'Double Speed - 300 Mbps Internet+Movie',
    speed: 100,
    price: 300000,
    category: 'Internet + Movie',
    badge: 'Paling Populer',
    features: ['Sudah termasuk berlangganan Netflix Basic Movie']
  },
  {
    name: 'Gamer Pro 150 Mbps',
    speed: 150,
    price: 350000,
    category: 'Internet + Game',
    badge: '',
    features: ['Prioritas traffic game', 'IP Public Dinamis', 'Low Latency']
  },
  {
    name: 'Family Entertainment 100 Mbps',
    speed: 100,
    price: 320000,
    category: 'Internet + TV',
    badge: '',
    features: ['Akses 80+ Channel TV Premium', 'Gratis Set Top Box']
  },
  {
    name: 'Ultra Speed 300 Mbps',
    speed: 300,
    price: 550000,
    category: 'Internet',
    badge: '',
    features: ['Cocok untuk kreator konten', 'Upload & Download simetris']
  }
];

// Fungsi seeder (Otomatis mengisi database jika kosong)
const seedPackages = async () => {
  try {
    const count = await Package.countDocuments();
    if (count === 0) {
      await Package.insertMany(initialPackages);
      console.log('âœ… Data Paket Internet awal berhasil ditambahkan ke MongoDB');
    }
  } catch (error) {
    console.error('Gagal melakukan seed data paket:', error.message);
  }
};

// Mengambil semua paket
const getPackages = async (req, res) => {
  try {
    const packages = await Package.find().sort({ price: 1 });
    res.status(200).json(packages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Menambahkan paket baru
const addPackage = async (req, res) => {
  const { name, speed, price, category, features } = req.body;
  try {
    const newPkg = new Package(req.body);
    await newPkg.save();
    await logActivity(req.user ? req.user._id : null, 'MEMBUAT', 'Paket & Promo', `Menambahkan paket baru: ${newPkg.name}`);
    res.status(201).json(newPkg);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

const updatePackage = async (req, res) => {
  try {
    const updatedPkg = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true });
    await logActivity(req.user ? req.user._id : null, 'MENGUBAH', 'Paket & Promo', `Mengedit paket: ${updatedPkg.name}`);
    res.status(200).json(updatedPkg);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Menghapus paket
const deletePackage = async (req, res) => {
  try {
    const pkg = await Package.findById(req.params.id);
    await Package.findByIdAndDelete(req.params.id);
    if (pkg) await logActivity(req.user ? req.user._id : null, 'MENGHAPUS', 'Paket & Promo', `Menghapus paket: ${pkg.name}`);
    res.status(200).json({ message: 'Package deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

module.exports = {
  seedPackages,
  getPackages,
  addPackage,
  updatePackage,
  deletePackage
};

