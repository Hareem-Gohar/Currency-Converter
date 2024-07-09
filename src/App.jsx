import React, { useState } from 'react'
import InputBox from './Components/InputBox'
import useCurrencyInfo from './Custom-hook/CurrencyInfo'
import "./App.css"

const App = () => {
  const [amount, setAmount] = useState(0);
  const [to, setTo] = useState('usd');
  const [from, setFrom] = useState('inr');
  const [convertedAmount, setConvertedAmount] = useState(0);
  const currencyInfo = useCurrencyInfo(from);

  const options = Object.keys(currencyInfo);

  const swap = () => {
      setTo(from);
      setFrom(to);
      setConvertedAmount(amount);
      setAmount(convertedAmount);
  };

  const convert = () => {
      setConvertedAmount(amount * (currencyInfo[to] || 1));
  };

  return (
      <div
          className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
          style={{
              backgroundImage: `url('https://images.pexels.com/photos/4911411/pexels-photo-4911411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
          }}
      >
          <div className="w-full px-4">
              <div className="w-full max-w-2xl mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
                  <form
                      onSubmit={(e) => {
                          e.preventDefault();
                          convert();
                      }}
                  >
                      <div className="w-full mb-1">
                          <InputBox
                              label="From"
                              amount={amount}
                              currencyOptions={options}
                              onCurrencyChange={(currency) => setFrom(currency)}
                              selectCurrency={from}
                              onAmountChange={(amount) => setAmount(amount)}
                          />
                      </div>
                      <div className="relative w-full h-0.5">
                          <button
                              type="button"
                              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-gray-700 text-white px-4 py-0.5"
                              onClick={swap}
                          >
                              Swap
                          </button>
                      </div>
                      <div className="w-full mt-1 mb-4">
                          <InputBox
                              label="To"
                              amount={convertedAmount}
                              currencyOptions={options}
                              onCurrencyChange={(currency) => setTo(currency)}
                              selectCurrency={to}
                              amountDisable
                          />
                      </div>
                      <button type="submit" className="w-full bg-gray-700 text-white px-4 py-3 rounded-lg">
                          {`Convert ${from.toUpperCase()} to ${to.toUpperCase()}`}
                      </button>
                  </form>
              </div>
          </div>
      </div>
  );
};

export default App