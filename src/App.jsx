import { useEffect, useState } from "react";
import Header from "./components/layout/Header/Header";
import Sliderate from "./components/layout/Sliderate/Sliderate";
import CurrencyConverter from "./feature/exchange/components/CurrencyConverter/CurrencyConverter";
import ExchangeViews from './feature/exchange/components/Tabs/ExchangeViews';
import { readStoredList, writeStoredList } from './feature/exchange/components/Tabs/storage';

const LOG_KEY = 'fx-checker-log';

export default function App() {
  const [sendCurrency, setSendCurrency] = useState("USD");
  const [receiveCurrency, setReceiveCurrency] = useState("EUR");
  const [sendAmount, setSendAmount] = useState(1000);
  const [logEntries, setLogEntries] = useState(() => readStoredList(LOG_KEY, []));

  useEffect(() => {
    writeStoredList(LOG_KEY, logEntries);
  }, [logEntries]);

  const handleLogConversion = (newEntry) => {
    if (!newEntry) return;

    setLogEntries((currentEntries) => [newEntry, ...currentEntries]);
  };

  const handleDeleteItem = (id) => {
    setLogEntries((currentEntries) => currentEntries.filter((entry) => entry.id !== id));
  };

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
          onLogConversion={handleLogConversion}
        />
        <ExchangeViews
          sendCurrency={sendCurrency}
          receiveCurrency={receiveCurrency}
          logEntries={logEntries}
          onDeleteLogItem={handleDeleteItem}
        />
      </section>
    </main>
  );
}
