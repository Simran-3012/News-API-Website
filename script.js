const API_KEY = "4274ed71cc9541b7bb0ab8ae21c6f3dc";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("Technology"));

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cardscontainer");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;

        const cardClone = newsCardTemplate.content.cloneNode(true);const API_KEY = "4274ed71cc9541b7bb0ab8ae21c6f3dc";
        const url = "https://newsapi.org/v2/top-headlines?country=in&category=";
        
        window.addEventListener("load", () => fetchNews("general")); 
        
        async function fetchNews(category) {
            const endpoint = `${url}${category}&apiKey=${API_KEY}`;
            console.log("Fetching news from:", endpoint); 
            try {
                const response = await fetch(endpoint);
                if (!response.ok) {
                    throw new Error(`Network response was not ok: ${response.statusText}`);
                }
                const data = await response.json();
                if (data.status !== "ok") {
                    throw new Error(`API Error: ${data.message}`);
                }
                bindData(data.articles);
            } catch (error) {
                console.error("Error fetching news:", error);
                alert("Failed to fetch news. Please try again later.");
            }
        }
        
        function bindData(articles) {
            const cardsContainer = document.getElementById("cardscontainer");
            const newsCardTemplate = document.getElementById("template-news-card");
        
            cardsContainer.innerHTML = "";
        
            articles.forEach((article) => {
                if (!article.urlToImage) return;
        
                const cardClone = newsCardTemplate.content.cloneNode(true);
                fillDataInCard(cardClone, article);
                cardsContainer.appendChild(cardClone);
            });
        }
        
        function fillDataInCard(cardClone, article) {
            const newsImg = cardClone.querySelector("#news-img");
            const newsTitle = cardClone.querySelector("#news-title");
            const newsSource = cardClone.querySelector("#news-source");
            const newsDesc = cardClone.querySelector("#news-desc");
        
            newsImg.src = article.urlToImage || "path/to/default-image.jpg";
            newsTitle.innerHTML = article.title ? `${article.title.slice(0, 60)}...` : "No title available";
            newsDesc.innerHTML = article.description ? `${article.description.slice(0, 150)}...` : "No description available";
        
            const date = new Date(article.publishedAt).toLocaleString("en-US", { timeZone: "Asia/Jakarta" });
            newsSource.innerHTML = `${article.source.name} · ${date}`;
        
            cardClone.firstElementChild.addEventListener("click", () => {
                window.open(article.url, "_blank");
            });
        }
        
        let curSelectedNav = null;
        function onNavItemClick(id) {
            let category = "";
            switch(id) {
                case "home":
                    category = "general"; 
                    break;
                case "entertainment":
                    category = "entertainment";
                    break;
                case "india":
                    category = "general";
                    break;
                case "world":
                    category = "general"; 
                    break;
                case "education":
                    category = "education"; 
                    break;
                case "sports":
                    category = "sports";
                    break;
            }
        
            fetchNews(category);
            const navItem = document.getElementById(id);
            curSelectedNav?.classList.remove("active");
            curSelectedNav = navItem;
            curSelectedNav.classList.add("active");
        }
        
        let debounceTimeout;
        const searchButton = document.getElementById("search-button");
        const searchText = document.getElementById("search-text");
        
        searchButton.addEventListener("click", () => {
            if (debounceTimeout) clearTimeout(debounceTimeout);
            debounceTimeout = setTimeout(() => {
                const query = searchText.value;
                if (!query) return;
                fetchNews(query);
                curSelectedNav?.classList.remove("active");
                curSelectedNav = null;
            }, 300);
        });
        
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    })
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = `${article.title.slice(0, 60)}...`;
    newsDesc.innerHTML = `${article.description.slice(0, 150)}...`;

    const date = new Date(article.publishedAt).toLocaleString("en-US", { timeZone: "Asia/Jakarta" })

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    })
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
})