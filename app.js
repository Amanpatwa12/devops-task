const express = require('express');
const path = require('path');
const app = express();

// Serve static file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'logoswayatt.png'));
});

// Listen on all network interfaces
app.listen(3000, '0.0.0.0', () => {
  console.log('Server running on http://0.0.0.0:3000');
});
