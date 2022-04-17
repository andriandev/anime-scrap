// Variabel Konfigurasi
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;
const router = require('./app/routes/router.js');

// Middleware
app.use(express.static('public'));
app.use(cors);
app.use('/', router);

// Konfigurasi EJS Layout
app.set('view engine', 'ejs');
app.set('views', './app/views');

app.listen(port, () => {
    console.log(`Server running in port ${port}`);
})

