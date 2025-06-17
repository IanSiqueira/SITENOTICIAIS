// api/politica.js
import express from 'express';
import fetch from 'node-fetch';
const router = express.Router();

router.get('/', async (req, res) => {
  const page = req.query.page || 1;
  const apiKey = process.env.NEWS_API_KEY;

  try {
    const response = await fetch(`https://newsapi.org/v2/everything?q=política+brasil&language=pt&pageSize=10&page=${page}&sortBy=publishedAt&apiKey=${apiKey}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar notícias.' });
  }
});

export default router;
