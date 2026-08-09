import { useState } from "react";
import Header from "./components/layout/Header/Header";
import Sliderate from "./components/layout/Sliderate/Sliderate";
import CurrencyConverter from "./feature/exchange/components/CurrencyConverter/CurrencyConverter";
import ExchangeViews from './feature/exchange/components/Tabs/ExchangeViews';

export default function App() {
  const [sendCurrency, setSendCurrency] = useState("USD");
  const [receiveCurrency, setReceiveCurrency] = useState("EUR");
  const [sendAmount, setSendAmount] = useState(1000);

  return (
    <main>
      <Header />
      <Sliderate />
      <section className="app-shell">
        <CurrencyConverter
          sendCurrency={sendCurrency}
          receiveCurrency={receiveCurrency}
          setSendCurrency={setSendCurrency}
          setReceiveCurrency={setReceiveCurrency}
          sendAmount={sendAmount}
          setSendAmount={setSendAmount}
        />
        <ExchangeViews
          sendCurrency={sendCurrency}
          receiveCurrency={receiveCurrency}
        />
      </section>
    </main>
  );
}
