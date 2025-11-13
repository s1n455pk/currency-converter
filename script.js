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
    // Fetch live rates from exchangerate.host API
    const url = `https://api.exchangerate.host/latest?base=${fromCurrency}&symbols=${toCurrency}`;
    const response = await fetch(url);
    const data = await response.json();

    if (!data.rates || !data.rates[toCurrency]) {
      result.innerText = '❌ Could not fetch rate. Try again later.';
      return;
    }

    const rate = data.rates[toCurrency];
    const convertedAmount = (amount * rate).toFixed(2);

    result.innerText = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
  } catch (error) {
    console.error('Error:', error);
    result.innerText = '🚫 Error fetching exchange rates. Please check your connection.';
  }
});
