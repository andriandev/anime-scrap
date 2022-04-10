// Variabel Konfigurasi
const express = require('express');
const router = express.Router();

// Load semua controller
const Controller = require('../controllers/autoload.js'); 

// Membuat variabel single controller
const Pages = Controller.Pages;
const Scrap = Controller.Scrap;

// System Routing
router.get('/', Pages.Home);
router.get('/about', Pages.About);

router.get('/scrap', Scrap.Index);
router.get('/scrap/geteps', Scrap.ScrapEps);

router.use('/', Pages.Error); // Halaman 404

module.exports = router;