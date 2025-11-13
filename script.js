// script.js
document.getElementById('convertBtn').addEventListener('click', function () {
    const amount = parseFloat(document.getElementById('amount').value);
    const fromCurrency = document.getElementById('fromCurrency').value;
    const toCurrency = document.getElementById('toCurrency').value;
  
    if (isNaN(amount)) {
      document.getElementById('result').innerText = 'Please enter a valid amount.';
      return;
    }
  
    // Exchange rates (example rates, ideally should use API like ExchangeRatesAPI or similar)
    const exchangeRates = {
      USD: { USD: 1, EUR: 0.85, GBP: 0.75, INR: 73.5 },
      EUR: { USD: 1.18, EUR: 1, GBP: 0.88, INR: 86.5 },
      GBP: { USD: 1.33, EUR: 1.14, GBP: 1, INR: 98.5 },
      INR: { USD: 0.014, EUR: 0.012, GBP: 0.010, INR: 1 },
    };
  
    const convertedAmount = (amount * exchangeRates[fromCurrency][toCurrency]).toFixed(2);
  
    document.getElementById('result').innerText = `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`;
  });
  