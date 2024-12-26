const express = require('express');
const cors = require('cors');
const compressionRoutes = require('./routes/compress');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/compress-video', compressionRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(Server is running on http://localhost:${PORT});
});
