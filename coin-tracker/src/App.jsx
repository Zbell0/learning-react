import { func } from "prop-types";
import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoin] = useState([]);
  const [amount, setAmout] = useState();

  const onChange = (e) => {
    setAmout(e.target.value);
  };
  useEffect(() => {
    fetch("http://api.coinpaprika.com/v1/tickers")
      .then((Response) => Response.json())
      .then((json) => setCoin(json));
    setLoading(false);
  }, []);
  return (
    <div>
      <h1>The Coins! {coins.length}</h1>
      {loading ? <strong>Loading..</strong> : <h3>Coin list</h3>}

      <select>
        {coins.map((coin) => (
          <option>
            {coin.name}({coin.symbol}): ${coin.quotes.USD.price.toFixed(2)}USD
          </option>
        ))}
      </select>
      <hr />
      <div>
        <input
          onChange={onChange}
          value={amount}
          type="number"
          placeholder="USD"
        />
        <input value={amount * coin} type="number" placeholder="Coin" />
      </div>
    </div>
  );
}

export default App;
