
const currency = {};

currency.currencyBaseUrl = 'https://api.exchangeratesapi.io/latest';
currency.$userInput = $('#userInput');
currency.$baseAmount = $('#baseAmount');
currency.$baseCurrency = $('#baseCurrency');
currency.$quoteCurrency = $('#quoteCurrency');
currency.$currencyQuotation = $('#currencyQuotation');
currency.$baseCountry = $('#baseCountry');
currency.$targetCountry = $('#targetCountry');
currency.$result = $('#result');

currency.getExchangeRates = () => {
  const response = $.ajax({
    url: currency.currencyBaseUrl,
    method: 'GET',
    dataType: 'json',
    data: {
        base: currency.$baseCurrency.val(),
        symbols: currency.$quoteCurrency.val()
    }
  })
  return response;
}

currency.getCurrencyQuote = () => {
  
  const allExchangeRates = currency.getExchangeRates();
  allExchangeRates.done( (res) => {
    
    let userInput = currency.$userInput.val();
    let quoteCurrency = currency.$quoteCurrency.val();

    let exchangeRate = res.rates[quoteCurrency];
    
    let currencyQuotation  = exchangeRate * userInput;

    currency.$baseAmount.empty();
    currency.$baseAmount.append(userInput);
    currency.$userInput.val('');
    currency.$currencyQuotation.empty();
    currency.$currencyQuotation.append(currencyQuotation.toFixed(3)); 

    currency.getCountryNames();

  })

}

currency.getCountryNames = () => {

  let base = currency.$baseCurrency.val();
  let quoteCurrency = currency.$quoteCurrency.val();
  let baseAmount = currency.$baseAmount.text();
  let currencyQuotation = currency.$currencyQuotation.text();

  currency.$baseCountry.empty();
  currency.$targetCountry.empty();
  currency.$result.empty();

  const country = {
    AUD: 'Australian Dollar',
    BGN: 'Bulgarian Lev',
    BRL: 'Brazilian Real',
    CAD: 'Canadian Dollar',
    CHF: 'Swiss Franc',
    CNY: 'Chinese Yuan Renminbi',
    CZK: 'Czech Koruna',
    DKK: 'Danish Krone',
    GBP: 'British Pound',
    HKD: 'Hong Kong Dollar',
    HRK: 'Croatian Kuna',
    HUF: 'Hungarian Forint',
    IDR: 'Indonesian Rupiah',
    ILS: 'Israeli Shekel',
    INR: 'Indian Rupee',
    ISK: 'Iceland Krona',
    JPY: 'Japanese Yen',
    KRW: 'South Korean Won',
    MXN: 'Mexian Peso',
    MYR: 'Malaysian Ringgit',
    NOK: 'Norwegian Krone',
    NZD: 'New Zealand Dollar',
    PHP: 'Philippine Peso',
    PLN: 'Polish Zloty',
    RON: 'Romanian Leu',
    RUB: 'Russian Ruble',
    SEK: 'Swedish Krona',
    SGD: 'Singapore Dollar',
    THB: 'Thai Baht',
    TRY: 'Turkish Lira',
    USD: 'US Dollar',
    ZAR: 'South African Rand'

  };

  const entries = Object.entries(country);
  let countriesArray = [];

  entries.forEach(function(country){
    if (country[0] === base) {
      countriesArray[0] = country[1];
    }
    if (country[0] === quoteCurrency) {
      countriesArray[1] = country[1];
    }
  })

  currency.$result = currency.$result.append(`Currency Converter: ${baseAmount}  ${countriesArray[0]} = ${currencyQuotation} ${countriesArray[1]}`);

}

currency.getData = () => {

  $('form').on('submit', function(event) {
    event.preventDefault();
    currency.getCurrencyQuote();
  });
  
}

currency.init = () => {

  currency.getData();
}


$(function() {

  currency.init();

})