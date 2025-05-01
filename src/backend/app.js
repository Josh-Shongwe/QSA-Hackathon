require('dotenv').config();
const express = require('express');
const path = require('path');
const { OpenAI } = require('openai/index.mjs');
const { processTicket, extractTextFromImage } = require('./ticketAgent');

const app = express();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const multer = require('multer');
const upload = multer();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend')));

app.post('/analyze', async (req, res) => {
  const ticket = req.body.ticket || '';
  const imageText = req.body.imageText || '';
  try {
    const result = await processTicket(ticket, openai, imageText);
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/extract-text-from-image', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }
    
    const imageBase64 = req.file.buffer.toString('base64');
    const extractedText = await extractTextFromImage(imageBase64, openai);
    
    if (extractedText) {
      res.json({ extractedText });
    } else {
      res.status(500).json({ error: 'Failed to extract text from image' });
    }
  } catch (e) {
    console.error('Error extracting text from image:', e);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Ticket Processing Agent running on port ${PORT}`);
});
