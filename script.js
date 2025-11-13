// script.js

document.getElementById('convertBtn').addEventListener('click', async function () {
  const amount = parseFloat(document.getElementById('amount').value);
  const fromCurrency = document.getElementById('fromCurrency').value;
  const toCurrency = document.getElementById('toCurrency').value;
  const resultDiv = document.getElementById('result');

  if (isNaN(amount) || amount <= 0) {
    resultDiv.innerText = "⚠️ Please enter a valid amount.";
    return;
  }

  resultDiv.innerText = "Fetching live rates... 💱";

  try {
    // Live API from ExchangeRate-API
    const apiUrl = `https://v6.exchangerate-api.com/v6/c23106cd745dea0438c54665/latest/${fromCurrency}`;
    const res = await fetch(apiUrl);

    if (!res.ok) throw new Error("API request failed");

    const data = await res.json();

    if (data && data.conversion_rates && data.conversion_rates[toCurrency]) {
      const rate = data.conversion_rates[toCurrency];
      const convertedAmount = (amount * rate).toFixed(2);
      resultDiv.innerText = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency} 💰`;
    } else {
      resultDiv.innerText = "❌ Could not fetch valid exchange rate.";
    }
  } catch (err) {
    console.error("Error:", err);
    resultDiv.innerText = "🚫 Network or API error. Please try again.";
  }
});