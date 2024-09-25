const apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false`;
const loader = document.getElementById("loader");

const createCardsForContainer = (data) => {
  const container = document.getElementById('container');
  container.innerHTML = ''; // Clear previous cards if any

  data.forEach((coin) => {
    let card = document.createElement('div');
    card.classList.add('card');

    let img = document.createElement('img');
    img.src = coin.image;
    img.alt = coin.name;

    let h2 = document.createElement('h2');
    h2.textContent = coin.name;

    let symbol = document.createElement('div');
    symbol.classList.add('symbol');
    symbol.textContent = coin.symbol.toUpperCase();

    let price = document.createElement('p');
    price.classList.add('price');
    price.textContent = `Price: $${coin.current_price}`;

    let marketCap = document.createElement('p');
    marketCap.classList.add('market-cap');
    marketCap.textContent = `Market Cap: $${coin.market_cap.toLocaleString()}`;

    let ath = document.createElement('p');
    ath.classList.add('ath');
    ath.textContent = `ATH: $${coin.ath}`;

    let viewMore = document.createElement('a');
    viewMore.classList.add('view-more');
    viewMore.textContent = 'View More';
    viewMore.href = `https://www.coingecko.com/en/coins/${coin.id}`;
    viewMore.target = '_blank';

    card.appendChild(img);
    card.appendChild(h2);
    card.appendChild(symbol);
    card.appendChild(price);
    card.appendChild(marketCap);
    card.appendChild(ath);
    card.appendChild(viewMore);
    container.appendChild(card);
  });
};

const getApiData = () => {
  loader.style.display = "block";
  fetch(apiUrl)
    .then(async (res) => {
      let apiData = await res.json();
      setTimeout(() => {
        createCardsForContainer(apiData);
        loader.style.display = "none";
      }, 2000); // Simulated delay
    })
    .catch((err) => {
      console.error("Error occurred while getting data", err);
      loader.style.display = "none";
    });
};

document.addEventListener('DOMContentLoaded', getApiData);
