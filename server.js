console.log('Starting Express server...');
const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const CLIENT_URL = process.env.VITE_APP_CLIENT_URL || `http://localhost:${PORT}`;

console.log(`Configured to listen on port ${PORT}`);
console.log(`Client URL is ${CLIENT_URL}`);

// Enable CORS
app.use(cors());

app.use(fileUpload({
  createParentPath: true
}));

// Serve static files
const imagesDir = path.join(process.cwd(), 'src/data/images');
console.log(`Serving images from ${imagesDir}`);
app.use('/data/images', express.static(imagesDir));

app.post('/api/upload', async (req, res) => {
  try {
    if (!req.files) {
      return res.status(400).send({
        success: false,
        message: 'No file uploaded'
      });
    } else {
      let file = req.files.file;
      const uploadPath = path.join(imagesDir, file.name);
      console.log(`Uploading file to ${uploadPath}`);
      await file.mv(uploadPath);

      const fileUrl = `${CLIENT_URL}/data/images/${file.name}`;
      console.log(`File uploaded to ${fileUrl}`);

      res.send({
        success: true,
        message: 'File uploaded successfully',
        filePath: fileUrl
      });
    }
  } catch (err) {
    console.error('Error during file upload:', err);
    res.status(500).send(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
