document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const sortMarketCapButton = document.getElementById("sortMarketCap");
    const sortPercentageChangeButton = document.getElementById("sortPercentageChange");
    const cryptoTableBody = document.getElementById("cryptoTableBody");
  
    let cryptoData = [];
  
    // Fetch data using .then
    fetchCryptoDataWithThen();
  
    // Fetch data using async/await
    fetchCryptoDataWithAsyncAwait();
  
    // Search functionality
    searchButton.addEventListener("click", () => {
      const searchText = searchInput.value.toLowerCase();
      const filteredData = cryptoData.filter(crypto => crypto.name.toLowerCase().includes(searchText) || crypto.symbol.toLowerCase().includes(searchText));
      renderCryptoTable(filteredData);
    });
  
    // Sort by market cap
    sortMarketCapButton.addEventListener("click", () => {
      const sortedData = cryptoData.slice().sort((a, b) => b.market_cap - a.market_cap);
      renderCryptoTable(sortedData);
    });
  
    // Sort by percentage change
    sortPercentageChangeButton.addEventListener("click", () => {
      const sortedData = cryptoData.slice().sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
      renderCryptoTable(sortedData);
    });
  
    async function fetchCryptoDataWithAsyncAwait() {
      try {
        const response = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false");
        const data = await response.json();
        cryptoData = data.map(crypto => ({
          name: crypto.name,
          symbol: crypto.symbol,
          current_price: crypto.current_price,
          total_volume: crypto.total_volume,
          market_cap: crypto.market_cap,
          price_change_percentage_24h: crypto.price_change_percentage_24h
        }));
        renderCryptoTable(cryptoData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  
    function fetchCryptoDataWithThen() {
      fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false")
        .then(response => response.json())
        .then(data => {
          cryptoData = data.map(crypto => ({
            name: crypto.name,
            symbol: crypto.symbol,
            current_price: crypto.current_price,
            total_volume: crypto.total_volume,
            market_cap: crypto.market_cap,
            price_change_percentage_24h: crypto.price_change_percentage_24h
          }));
          renderCryptoTable(cryptoData);
        })
        .catch(error => console.error("Error fetching data:", error));
    }
  
    function renderCryptoTable(data) {
      cryptoTableBody.innerHTML = "";
      data.forEach(crypto => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${crypto.name}</td>
          <td>${crypto.symbol}</td>
          <td>${crypto.current_price}</td>
          <td>${crypto.total_volume}</td>
          <td>${crypto.market_cap}</td>
          <td>${crypto.price_change_percentage_24h}</td>
        `;
        cryptoTableBody.appendChild(row);
      });
    }
  });