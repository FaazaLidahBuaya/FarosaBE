const mongoose = require('mongoose');
const City = require('./models/City');
require('dotenv').config();

const allCities = [
  { name: 'Kota Banda Aceh', province: 'Aceh' }, { name: 'Kota Langsa', province: 'Aceh' },
  { name: 'Kota Lhokseumawe', province: 'Aceh' }, { name: 'Kota Sabang', province: 'Aceh' },
  { name: 'Kota Subulussalam', province: 'Aceh' }, { name: 'Kota Denpasar', province: 'Bali' },
  { name: 'Kota Pangkalpinang', province: 'Bangka Belitung' }, { name: 'Kota Cilegon', province: 'Banten' },
  { name: 'Kota Serang', province: 'Banten' }, { name: 'Kota Tangerang Selatan', province: 'Banten' },
  { name: 'Kota Tangerang', province: 'Banten' }, { name: 'Kota Bengkulu', province: 'Bengkulu' },
  { name: 'Kota Yogyakarta', province: 'DI Yogyakarta' }, { name: 'Kota Jakarta Barat', province: 'DKI Jakarta' },
  { name: 'Kota Jakarta Pusat', province: 'DKI Jakarta' }, { name: 'Kota Jakarta Selatan', province: 'DKI Jakarta' },
  { name: 'Kota Jakarta Timur', province: 'DKI Jakarta' }, { name: 'Kota Jakarta Utara', province: 'DKI Jakarta' },
  { name: 'Kota Gorontalo', province: 'Gorontalo' }, { name: 'Kota Jambi', province: 'Jambi' },
  { name: 'Kota Bandung', province: 'Jawa Barat' }, { name: 'Kota Bekasi', province: 'Jawa Barat' },
  { name: 'Kota Bogor', province: 'Jawa Barat' }, { name: 'Kota Cimahi', province: 'Jawa Barat' },
  { name: 'Kota Cirebon', province: 'Jawa Barat' }, { name: 'Kota Depok', province: 'Jawa Barat' },
  { name: 'Kota Sukabumi', province: 'Jawa Barat' }, { name: 'Kota Tasikmalaya', province: 'Jawa Barat' },
  { name: 'Kota Banjar', province: 'Jawa Barat' }, { name: 'Kota Magelang', province: 'Jawa Tengah' },
  { name: 'Kota Pekalongan', province: 'Jawa Tengah' }, { name: 'Kota Salatiga', province: 'Jawa Tengah' },
  { name: 'Kota Semarang', province: 'Jawa Tengah' }, { name: 'Kota Surakarta', province: 'Jawa Tengah' },
  { name: 'Kota Tegal', province: 'Jawa Tengah' }, { name: 'Kota Batu', province: 'Jawa Timur' },
  { name: 'Kota Blitar', province: 'Jawa Timur' }, { name: 'Kota Kediri', province: 'Jawa Timur' },
  { name: 'Kota Madiun', province: 'Jawa Timur' }, { name: 'Kota Malang', province: 'Jawa Timur' },
  { name: 'Kota Mojokerto', province: 'Jawa Timur' }, { name: 'Kota Pasuruan', province: 'Jawa Timur' },
  { name: 'Kota Probolinggo', province: 'Jawa Timur' }, { name: 'Kota Surabaya', province: 'Jawa Timur' },
  { name: 'Kota Pontianak', province: 'Kalimantan Barat' }, { name: 'Kota Singkawang', province: 'Kalimantan Barat' },
  { name: 'Kota Banjarbaru', province: 'Kalimantan Selatan' }, { name: 'Kota Banjarmasin', province: 'Kalimantan Selatan' },
  { name: 'Kota Palangka Raya', province: 'Kalimantan Tengah' }, { name: 'Kota Balikpapan', province: 'Kalimantan Timur' },
  { name: 'Kota Bontang', province: 'Kalimantan Timur' }, { name: 'Kota Samarinda', province: 'Kalimantan Timur' },
  { name: 'Kota Tarakan', province: 'Kalimantan Utara' }, { name: 'Kota Batam', province: 'Kepulauan Riau' },
  { name: 'Kota Tanjungpinang', province: 'Kepulauan Riau' }, { name: 'Kota Bandar Lampung', province: 'Lampung' },
  { name: 'Kota Metro', province: 'Lampung' }, { name: 'Kota Ternate', province: 'Maluku Utara' },
  { name: 'Kota Tidore Kepulauan', province: 'Maluku Utara' }, { name: 'Kota Ambon', province: 'Maluku' },
  { name: 'Kota Tual', province: 'Maluku' }, { name: 'Kota Bima', province: 'Nusa Tenggara Barat' },
  { name: 'Kota Mataram', province: 'Nusa Tenggara Barat' }, { name: 'Kota Kupang', province: 'Nusa Tenggara Timur' },
  { name: 'Kota Sorong', province: 'Papua Barat Daya' }, { name: 'Kota Jayapura', province: 'Papua' },
  { name: 'Kota Dumai', province: 'Riau' }, { name: 'Kota Pekanbaru', province: 'Riau' },
  { name: 'Kota Makassar', province: 'Sulawesi Selatan' }, { name: 'Kota Palopo', province: 'Sulawesi Selatan' },
  { name: 'Kota Parepare', province: 'Sulawesi Selatan' }, { name: 'Kota Palu', province: 'Sulawesi Tengah' },
  { name: 'Kota Baubau', province: 'Sulawesi Tenggara' }, { name: 'Kota Kendari', province: 'Sulawesi Tenggara' },
  { name: 'Kota Bitung', province: 'Sulawesi Utara' }, { name: 'Kota Kotamobagu', province: 'Sulawesi Utara' },
  { name: 'Kota Manado', province: 'Sulawesi Utara' }, { name: 'Kota Tomohon', province: 'Sulawesi Utara' },
  { name: 'Kota Bukittinggi', province: 'Sumatera Barat' }, { name: 'Kota Padang', province: 'Sumatera Barat' },
  { name: 'Kota Padangpanjang', province: 'Sumatera Barat' }, { name: 'Kota Pariaman', province: 'Sumatera Barat' },
  { name: 'Kota Payakumbuh', province: 'Sumatera Barat' }, { name: 'Kota Sawahlunto', province: 'Sumatera Barat' },
  { name: 'Kota Solok', province: 'Sumatera Barat' }, { name: 'Kota Lubuklinggau', province: 'Sumatera Selatan' },
  { name: 'Kota Pagar Alam', province: 'Sumatera Selatan' }, { name: 'Kota Palembang', province: 'Sumatera Selatan' },
  { name: 'Kota Prabumulih', province: 'Sumatera Selatan' }, { name: 'Kota Binjai', province: 'Sumatera Utara' },
  { name: 'Kota Gunungsitoli', province: 'Sumatera Utara' }, { name: 'Kota Medan', province: 'Sumatera Utara' },
  { name: 'Kota Padangsidempuan', province: 'Sumatera Utara' }, { name: 'Kota Pematangsiantar', province: 'Sumatera Utara' },
  { name: 'Kota Sibolga', province: 'Sumatera Utara' }, { name: 'Kota Tanjungbalai', province: 'Sumatera Utara' },
  { name: 'Kota Tebing Tinggi', province: 'Sumatera Utara' },
  // Adding some major Kabupaten
  { name: 'Kabupaten Bogor', province: 'Jawa Barat' }, { name: 'Kabupaten Bekasi', province: 'Jawa Barat' },
  { name: 'Kabupaten Tangerang', province: 'Banten' }, { name: 'Kabupaten Bandung', province: 'Jawa Barat' },
  { name: 'Kabupaten Sidoarjo', province: 'Jawa Timur' }, { name: 'Kabupaten Sleman', province: 'DI Yogyakarta' },
  { name: 'Kabupaten Bantul', province: 'DI Yogyakarta' }, { name: 'Kabupaten Gresik', province: 'Jawa Timur' },
  { name: 'Kabupaten Jember', province: 'Jawa Timur' }, { name: 'Kabupaten Banyumas', province: 'Jawa Tengah' },
  { name: 'Kabupaten Klaten', province: 'Jawa Tengah' }
];

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  await City.deleteMany({}); // Wipe the old cities
  await City.insertMany(allCities);
  console.log(`Seeded ${allCities.length} cities to Atlas!`);
  process.exit();
}).catch(err => {
  console.log(err);
  process.exit(1);
});
