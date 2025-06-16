export default async function handler(req, res) {
  const API_KEY = "abdace74bc5b470bbae0c823922466e8";
  const page = req.query.page || 1;
  const url = `https://newsapi.org/v2/everything?q=tecnologia+brasil&language=pt&pageSize=20&page=${page}&sortBy=publishedAt&apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.message || "Erro na NewsAPI" });
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar notícias." });
  }
}