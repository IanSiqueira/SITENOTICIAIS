export default async function handler(req, res) {
  const { page = 1 } = req.query;
  const API_KEY = "abdace74bc5b470bbae0c823922466e8";
  const url = `https://newsapi.org/v2/everything?q=tecnologia+brasil&language=pt&pageSize=20&page=${page}&sortBy=publishedAt&apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Erro ao buscar dados da NewsAPI." });
  }
}
