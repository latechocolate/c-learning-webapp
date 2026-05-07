const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 8094;

const app = express();
app.use(express.static(path.join(__dirname, 'public'), {
  extensions: ['html'],
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache');
    }
  }
}));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`C-Kurs listening on :${PORT}`);
});
