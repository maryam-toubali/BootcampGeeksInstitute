const fromSelect = document.getElementById('from-currency');
const toSelect = document.getElementById('to-currency');
const amountInput = document.getElementById('amount');
const convertBtn = document.getElementById('convert-btn');
const resultDiv = document.getElementById('result');
const switchBtn = document.getElementById('switch-btn');

const API_KEY = '7dbba6af721d83a4d1f0391d';
const BASE_URL = 'https://v6.exchangerate-api.com/v6';

// Fetch supported currencies
async function getSupportedCurrencies() {
  try {
    const res = await fetch(`${BASE_URL}/${API_KEY}/codes`);
    const data = await res.json();
    if (data.result === 'success') {
      populateDropdowns(data.supported_codes);
    } else {
      throw new Error("Failed to load currencies");
    }
  } catch (err) {
    resultDiv.textContent = `❌ ${err.message}`;
  }
}

function populateDropdowns(codes) {
  codes.forEach(([code, name]) => {
    const option1 = document.createElement('option');
    const option2 = document.createElement('option');
    option1.value = option2.value = code;
    option1.textContent = `${code} - ${name}`;
    option2.textContent = `${code} - ${name}`;
    fromSelect.appendChild(option1);
    toSelect.appendChild(option2);
  });
  fromSelect.value = 'USD';
  toSelect.value = 'EUR';
}

// Convert currency
async function convertCurrency() {
  const from = fromSelect.value;
  const to = toSelect.value;
  const amount = parseFloat(amountInput.value);

  if (isNaN(amount) || amount <= 0) {
    resultDiv.textContent = "❗ Please enter a valid amount.";
    return;
  }

  try {
    const res = await fetch(`${BASE_URL}/${API_KEY}/pair/${from}/${to}/${amount}`);
    const data = await res.json();
    if (data.result === 'success') {
      resultDiv.textContent = `${amount} ${from} = ${data.conversion_result} ${to}`;
    } else {
      throw new Error("Conversion failed.");
    }
  } catch (err) {
    resultDiv.textContent = `❌ ${err.message}`;
  }
}

// Switch currencies
function switchCurrencies() {
  const temp = fromSelect.value;
  fromSelect.value = toSelect.value;
  toSelect.value = temp;
  convertCurrency();
}

convertBtn.addEventListener('click', convertCurrency);
switchBtn.addEventListener('click', switchCurrencies);

// Init
getSupportedCurrencies();
