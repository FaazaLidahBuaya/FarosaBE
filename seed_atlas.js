const mongoose = require('mongoose');
const User = require('./models/User');
const InstallationRequest = require('./models/InstallationRequest');
require('dotenv').config();

const dummyUsers = [];
for(let i=1; i<=20; i++) {
  dummyUsers.push({
    name: `Customer ${i}`,
    email: `customer${i}@mail.com`,
    password: `password${i}`,
    phone: `0812${Math.floor(Math.random()*100000000)}`,
    usageType: i % 2 === 0 ? 'personal' : 'bisnis',
    role: 'customer'
  });
}

const statuses = ['Pending', 'Survey Lokasi', 'Proses Pasang', 'Aktif', 'Dibatalkan'];
const dummyInstall = [];
for(let i=1; i<=40; i++) {
  const isPast = i % 2 === 0;
  const d = new Date();
  if (isPast) {
    d.setDate(d.getDate() - Math.floor(Math.random() * 60)); // up to 60 days in past
  } else {
    d.setDate(d.getDate() + Math.floor(Math.random() * 10)); // future
  }
  
  dummyInstall.push({
    fullName: `Customer ${i}`,
    email: `customer${i}@mail.com`,
    phoneNumber: `0812${Math.floor(Math.random()*100000000)}`,
    fullAddress: `Jl. Dummy No. ${i}, Kota Semarang`,
    selectedPackage: i % 3 === 0 ? '50 Mbps' : (i % 2 === 0 ? '100 Mbps' : '20 Mbps'),
    packagePrice: i % 3 === 0 ? 350000 : (i % 2 === 0 ? 500000 : 250000),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    installationDate: d,
    createdAt: isPast ? d : new Date()
  });
}

mongoose.connect(process.env.MONGODB_URI).then(async () => {
  await User.insertMany(dummyUsers);
  await InstallationRequest.insertMany(dummyInstall);
  console.log('Dummy data berhasil ditambahkan ke Atlas!');
  process.exit();
}).catch(err => {
  console.log(err);
  process.exit(1);
});
