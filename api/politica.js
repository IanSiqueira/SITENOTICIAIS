const API_KEY = "abdace74bc5b470bbae0c823922466e8";
let page = 1;
let carregando = false;
const maxRequests = 5;
let requestsFeitas = 0;

function carregarNoticias() {
  if (carregando || requestsFeitas >= maxRequests) return;
  carregando = true;

  fetch(`https://newsapi.org/v2/everything?q=política+brasil&language=pt&pageSize=10&page=${page}&sortBy=publishedAt&apiKey=${API_KEY}`)
    .then(res => res.json())
    .then(data => {
      const noticias = data.articles;
      const container = document.getElementById("politica-container");
      const carousel = document.getElementById("carousel-inner");

      if (!noticias || noticias.length === 0) {
        container.innerHTML += "<p>Sem mais notícias para exibir.</p>";
        return;
      }

      noticias.forEach((article, index) => {
        if (
          !article.title ||
          !article.description ||
          !article.url ||
          !article.urlToImage ||
          article.urlToImage.includes("null")
        ) return;

        // Carrossel
        if (page === 1 && index < 5) {
          carousel.innerHTML += `
            <div class="carousel-item ${index === 0 ? 'active' : ''}">
              <img src="${article.urlToImage}" class="d-block w-100" style="max-height:400px; object-fit:cover;">
              <div class="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded">
                <h5 class="text-white">${article.title}</h5>
                <p>${article.description}</p>
                <a href="${article.url}" target="_blank" class="btn btn-light btn-sm">Leia mais</a>
              </div>
            </div>`;
        }

        // Conteúdo principal
        container.innerHTML += `
          <div class="row mb-4 pb-3 border-bottom">
            <div class="col-md-5">
              <img src="${article.urlToImage}" class="img-fluid rounded" alt="Imagem">
            </div>
            <div class="col-md-7">
              <h5 class="fw-bold text-danger">${article.title}</h5>
              <p>${article.description}</p>
              <a href="${article.url}" target="_blank" class="btn btn-outline-danger btn-sm">Leia mais</a>
            </div>
          </div>`;
      });

      page++;
      requestsFeitas++;
      carregando = false;
    })
    .catch(error => {
      console.error("Erro ao carregar NewsAPI:", error);
      document.getElementById("politica-container").innerHTML += "<p>Erro ao carregar notícias.</p>";
      carregando = false;
    });
}

// Scroll infinito
window.addEventListener("scroll", () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 300) {
    carregarNoticias();
  }
});

// Primeira carga
carregarNoticias();
