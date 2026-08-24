const logActivity = require('../utils/logger');
const InstallationRequest = require('../models/InstallationRequest');
const Chat = require('../models/Chat');

// Create a new installation request
exports.createRequest = async (req, res) => {
  try {
    const newRequest = new InstallationRequest(req.body);
    const savedRequest = await newRequest.save();
    res.status(201).json({ success: true, data: savedRequest });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get all requests
exports.getRequests = async (req, res) => {
  try {
    const status = req.query.status;
    let query = {};
    if (status) {
      query.status = status;
    }
    if (req.query.userId && req.query.userId !== "undefined") {
      query.userId = req.query.userId;
    }
    const requests = await InstallationRequest.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: requests });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update request status
exports.updateRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({ success: false, message: 'Status is required' });
    }

    const updatedRequest = await InstallationRequest.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }

    await logActivity(req.user ? req.user._id : null, 'MENGUBAH', 'Pengajuan Pasang', `Mengubah status pengajuan ${updatedRequest.name} menjadi ${updatedRequest.status}`);
    res.status(200).json({ success: true, data: updatedRequest });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Konfirmasi oleh Manager (set tanggal, tim, dan kirim chat ke user)
exports.confirmRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { installationDate, assignedTeam, confirmedBy } = req.body;

    if (!installationDate || !assignedTeam) {
      return res.status(400).json({ success: false, message: 'Tanggal pemasangan dan tim wajib diisi' });
    }

    const updatedRequest = await InstallationRequest.findByIdAndUpdate(
      id,
      {
        status: 'Dikonfirmasi',
        installationDate,
        assignedTeam,
        confirmedBy: confirmedBy || 'Manager'
      },
      { new: true, runValidators: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ success: false, message: 'Request not found' });
    }

    // Kirim pesan konfirmasi ke chat user
    if (updatedRequest.userId) {
      const formattedDate = new Date(installationDate).toLocaleDateString('id-ID', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      const confirmationMsg = `âœ… Kabar baik! Pesanan Anda telah dikonfirmasi oleh Manager.\n\nðŸ“¦ Paket: ${updatedRequest.selectedPackage}\nðŸ“… Jadwal Pemasangan: ${formattedDate}\nðŸ‘· Tim Teknisi: ${assignedTeam}\nðŸ“ Alamat: ${updatedRequest.fullAddress}\n\nTim teknisi kami akan menghubungi Anda sebelum datang ke lokasi. Terima kasih telah memilih Farosa WiFi! ðŸš€`;

      let chat = await Chat.findOne({ userId: updatedRequest.userId });
      if (!chat) {
        chat = new Chat({ userId: updatedRequest.userId, messages: [] });
      }
      chat.messages.push({ sender: 'bot', text: confirmationMsg });
      await chat.save();
    }

    await logActivity(req.user ? req.user._id : null, 'MENGUBAH', 'Pengajuan Pasang', `Mengubah status pengajuan ${updatedRequest.name} menjadi ${updatedRequest.status}`);
    res.status(200).json({ success: true, data: updatedRequest });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};


// Auto-activate installations that have passed their installationDate
exports.autoActivateInstallations = async () => {
  try {
    const now = new Date();
    // Cari semua request yang belum Aktif, punya installationDate, dan waktunya sudah lewat
    const requests = await InstallationRequest.find({
      status: { $in: ['Dikonfirmasi', 'Survey Lokasi', 'Proses Pasang'] },
      installationDate: { $lte: now, $ne: null }
    });

    for (const req of requests) {
      req.status = 'Aktif';
      await req.save();

      // Kirim pesan ke pelanggan
      if (req.userId) {
        let chat = await Chat.findOne({ userId: req.userId });
        if (!chat) {
          chat = new Chat({ userId: req.userId, messages: [] });
        }
        
        const successMsg = `🎉 Hore! Layanan WiFi Anda (${req.selectedPackage}) kini telah AKTIF dan siap digunakan.\n\nSelamat menikmati koneksi internet cepat dari Farosa WiFi. Jika terdapat kendala, silakan hubungi "cs" melalui chat ini. Terima kasih! 🚀`;
        
        chat.messages.push({ sender: 'bot', text: successMsg });
        await chat.save();
      }
      
      console.log(`Auto-activated request ${req._id} for ${req.fullName}`);
    }
  } catch (error) {
    console.error('Error auto-activating installations:', error);
  }
};




