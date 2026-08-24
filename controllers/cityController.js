const City = require('../models/City');

// 32 Data Kota Awal
const initialCities = [
  { name: 'Kota Ambon', province: 'Maluku' },
  { name: 'Kota Balikpapan', province: 'Kalimantan Timur' },
  { name: 'Kota Banda Aceh', province: 'Nanggroe Aceh Darussalam' },
  { name: 'Kota Bandar Lampung', province: 'Lampung' },
  { name: 'Kota Bandung', province: 'Jawa Barat' },
  { name: 'Kota Banjarbaru', province: 'Kalimantan Selatan' },
  { name: 'Kota Banjarmasin', province: 'Kalimantan Selatan' },
  { name: 'Kota Batam', province: 'Kepulauan Riau' },
  { name: 'Kota Bekasi', province: 'Jawa Barat' },
  { name: 'Kota Bengkulu', province: 'Bengkulu' },
  { name: 'Kota Bogor', province: 'Jawa Barat' },
  { name: 'Kota Cirebon', province: 'Jawa Barat' },
  { name: 'Kota Denpasar', province: 'Bali' },
  { name: 'Kota Depok', province: 'Jawa Barat' },
  { name: 'Kota Gorontalo', province: 'Gorontalo' },
  { name: 'Kota Jakarta', province: 'DKI Jakarta' },
  { name: 'Kota Jambi', province: 'Jambi' },
  { name: 'Kota Jayapura', province: 'Papua' },
  { name: 'Kota Kendari', province: 'Sulawesi Tenggara' },
  { name: 'Kota Kupang', province: 'Nusa Tenggara Timur' },
  { name: 'Kota Makassar', province: 'Sulawesi Selatan' },
  { name: 'Kota Malang', province: 'Jawa Timur' },
  { name: 'Kota Manado', province: 'Sulawesi Utara' },
  { name: 'Kota Mataram', province: 'Nusa Tenggara Barat' },
  { name: 'Kota Medan', province: 'Sumatera Utara' },
  { name: 'Kota Padang', province: 'Sumatera Barat' },
  { name: 'Kota Palangka Raya', province: 'Kalimantan Tengah' },
  { name: 'Kota Palembang', province: 'Sumatera Selatan' },
  { name: 'Kota Palu', province: 'Sulawesi Tengah' },
  { name: 'Kota Pontianak', province: 'Kalimantan Barat' },
  { name: 'Kota Semarang', province: 'Jawa Tengah' },
  { name: 'Kota Surabaya', province: 'Jawa Timur' },
  { name: 'Kota Surakarta', province: 'Jawa Tengah' },
  { name: 'Kota Yogyakarta', province: 'Daerah Istimewa Yogyakarta' },
  { name: 'Kota Tangerang', province: 'Banten' },
  { name: 'Kota Tangerang Selatan', province: 'Banten' },
  { name: 'Kota Cilegon', province: 'Banten' },
  { name: 'Kota Serang', province: 'Banten' },
  { name: 'Kota Sukabumi', province: 'Jawa Barat' },
  { name: 'Kota Tasikmalaya', province: 'Jawa Barat' },
  { name: 'Kota Cimahi', province: 'Jawa Barat' },
  { name: 'Kota Banjar', province: 'Jawa Barat' },
  { name: 'Kota Magelang', province: 'Jawa Tengah' },
  { name: 'Kota Salatiga', province: 'Jawa Tengah' },
  { name: 'Kota Pekalongan', province: 'Jawa Tengah' },
  { name: 'Kota Tegal', province: 'Jawa Tengah' },
  { name: 'Kota Madiun', province: 'Jawa Timur' },
  { name: 'Kota Kediri', province: 'Jawa Timur' },
  { name: 'Kota Blitar', province: 'Jawa Timur' },
  { name: 'Kota Pasuruan', province: 'Jawa Timur' },
  { name: 'Kota Probolinggo', province: 'Jawa Timur' },
  { name: 'Kota Mojokerto', province: 'Jawa Timur' },
  { name: 'Kota Batu', province: 'Jawa Timur' },
  { name: 'Kota Binjai', province: 'Sumatera Utara' },
  { name: 'Kota Tebing Tinggi', province: 'Sumatera Utara' },
  { name: 'Kota Pematangsiantar', province: 'Sumatera Utara' },
  { name: 'Kota Tanjungbalai', province: 'Sumatera Utara' },
  { name: 'Kota Sibolga', province: 'Sumatera Utara' },
  { name: 'Kota Padang Sidempuan', province: 'Sumatera Utara' },
  { name: 'Kota Gunungsitoli', province: 'Sumatera Utara' },
  { name: 'Kota Bukittinggi', province: 'Sumatera Barat' },
  { name: 'Kota Padang Panjang', province: 'Sumatera Barat' },
  { name: 'Kota Payakumbuh', province: 'Sumatera Barat' },
  { name: 'Kota Solok', province: 'Sumatera Barat' },
  { name: 'Kota Sawahlunto', province: 'Sumatera Barat' },
  { name: 'Kota Pariaman', province: 'Sumatera Barat' },
  { name: 'Kota Dumai', province: 'Riau' },
  { name: 'Kota Pekanbaru', province: 'Riau' },
  { name: 'Kota Tanjung Pinang', province: 'Kepulauan Riau' },
  { name: 'Kota Lubuklinggau', province: 'Sumatera Selatan' },
  { name: 'Kota Pagar Alam', province: 'Sumatera Selatan' },
  { name: 'Kota Prabumulih', province: 'Sumatera Selatan' },
  { name: 'Kota Pangkalpinang', province: 'Bangka Belitung' },
  { name: 'Kota Tarakan', province: 'Kalimantan Utara' },
  { name: 'Kota Singkawang', province: 'Kalimantan Barat' },
  { name: 'Kota Bontang', province: 'Kalimantan Timur' },
  { name: 'Kota Samarinda', province: 'Kalimantan Timur' },
  { name: 'Kota Bitung', province: 'Sulawesi Utara' },
  { name: 'Kota Tomohon', province: 'Sulawesi Utara' },
  { name: 'Kota Kotamobagu', province: 'Sulawesi Utara' },
  { name: 'Kota Parepare', province: 'Sulawesi Selatan' },
  { name: 'Kota Palopo', province: 'Sulawesi Selatan' }
];

// Fungsi seeder (Otomatis mengisi database jika kosong)
const seedCities = async () => {
  try {
    const count = await City.countDocuments();
    if (count === 0) {
      await City.insertMany(initialCities);
      console.log('✅ 32 Data Kota berhasil ditambahkan ke MongoDB');
    }
  } catch (error) {
    console.error('Gagal melakukan seed data kota:', error.message);
  }
};

// Mengambil semua kota
const getCities = async (req, res) => {
  try {
    const cities = await City.find().sort({ name: 1 });
    res.status(200).json(cities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Menambahkan kota baru
const addCity = async (req, res) => {
  const { name, province } = req.body;
  
  if (!name || !province) {
    return res.status(400).json({ message: 'Nama kota dan provinsi harus diisi' });
  }

  try {
    const newCity = new City({ name, province });
    await newCity.save();
    res.status(201).json(newCity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Menghapus kota
const deleteCity = async (req, res) => {
  try {
    const city = await City.findByIdAndDelete(req.params.id);
    if (!city) {
      return res.status(404).json({ message: 'Kota tidak ditemukan' });
    }
    res.status(200).json({ message: 'Kota berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  seedCities,
  getCities,
  addCity,
  deleteCity
};
