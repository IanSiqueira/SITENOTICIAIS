export default async function handler(req, res) {
  const { page = 1 } = req.query;

  const url = `https://newsapi.org/v2/everything?q=cinema+filmes+brasil&language=pt&pageSize=10&page=${page}&sortBy=publishedAt&apiKey=SEU_API_KEY_AQUI`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar notícias de cinema' });
  }
}
