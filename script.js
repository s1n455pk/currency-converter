// script.js

document.getElementById('convertBtn').addEventListener('click', async function () {
  const amount = parseFloat(document.getElementById('amount').value);
  const fromCurrency = document.getElementById('fromCurrency').value;
  const toCurrency = document.getElementById('toCurrency').value;
  const result = document.getElementById('result');

  if (isNaN(amount) || amount <= 0) {
    result.innerText = '⚠️ Please enter a valid amount.';
    return;
  }

  // Show loading message
  result.innerText = 'Fetching latest exchange rates... 💱';

  try {
    // ✅ Fixed API endpoint (always returns latest data)
    const url = `https://api.exchangerate.host/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}&_=${Date.now()}`;
    const response = await fetch(url);
    const data = await response.json();

    // ✅ Safe check for rate and result
    if (!data.result) {
      result.innerText = '❌ Could not fetch rate. Try again later.';
      return;
    }

    const convertedAmount = data.result.toFixed(2);
    result.innerText = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
  } catch (error) {
    console.error('Error:', error);
    result.innerText = '🚫 Error fetching exchange rates. Please check your connection.';
  }
});
