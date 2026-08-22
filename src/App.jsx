import { useEffect, useState } from "react";
import Header from "./components/layout/Header/Header";
import Sliderate from "./components/layout/Sliderate/Sliderate";
import CurrencyConverter from "./feature/exchange/components/CurrencyConverter/CurrencyConverter";
import ExchangeViews from "./feature/exchange/components/Tabs/ExchangeViews";
import {
  readStoredList,
  writeStoredList,
} from "./feature/exchange/components/Tabs/storage";

const LOG_KEY = "fx-checker-log";
const FAV_KEY = "fx-checker-favorite";

// In Vite, you can dynamically resolve assets like this:
function getFlagUrl(code) {
  // We use .toLowerCase() because your files in assets/ are named 'gb.webp', 'us.webp', etc.
  return new URL(`./assets/${code.toLowerCase()}.webp`, import.meta.url).href;
}

export default function App() {
  const [sendCurrency, setSendCurrency] = useState("USD");
  const [receiveCurrency, setReceiveCurrency] = useState("EUR");
  const [sendAmount, setSendAmount] = useState(1000);
  const [favorites , setFavorites] = useState(() =>
    readStoredList(FAV_KEY, []),
  );
  const [logEntries, setLogEntries] = useState(() =>
    readStoredList(LOG_KEY, []),
  );

  useEffect(() => {
    writeStoredList(LOG_KEY, logEntries);
  }, [logEntries]);

  useEffect(() => {
    writeStoredList(FAV_KEY, favorites);
  }, [favorites]);



  const compareEntries = [
    {
      code: "GBP",
      name: "British Pound",
      flag: getFlagUrl("gb"),
      rate: 0.73665,
      
    },
    {
      code: "JPY",
      name: "Japanese Yen",
      flag: getFlagUrl("jp"),
      rate: 157.91,
      
    },
    {
      code: "CHF",
      name: "Swiss Franc",
      flag:   getFlagUrl("sz"),
      rate: 0.9098,
      
    },
    {
      code: "CAD",
      name: "Canadian Dollar",
      flag:  getFlagUrl("ca"),
      rate: 1.3815,
      
    },
    {
      code: "AUD",
      name: "Australian Dollar",
      flag: getFlagUrl("au"),
      rate: 1.38735,
      
    },
    { code: "INR", name: "Indian Rupee", flag: getFlagUrl("in"), rate: 94.91, isFav: true },
    { code: "CNY", name: "Chinese Yuan", flag: getFlagUrl("cn"), rate: 7.21, isFav: false },
    {
      code: "BDT",
      name: "Bangladeshi Taka",
      flag: getFlagUrl("bd"),
      rate: 122.92,
     
    },
  ]

  const handleLogConversion = (newEntry) => {
    if (!newEntry) return;

    setLogEntries((currentEntries) => [newEntry, ...currentEntries]);
  };

  const handleDeleteItem = (id) => {
    setLogEntries((currentEntries) =>
      currentEntries.filter((entry) => entry.id !== id),
    );
  };
  const handleClearAll = () => {
    setLogEntries([]);
  }

  const handleToggleFavorite =(code) => {
    setFavorites((currentEntries) => {
       const isFavorite = currentEntries.some((entry) => entry.code === code);
      if (isFavorite) {
        return currentEntries.filter((entry) => entry.code !== code);
      } else {
        const newEntry = compareEntries.find((entry) => entry.code === code);
        if (newEntry) {
          return [...currentEntries, newEntry];
        }
      }
      return currentEntries;
    });
  }


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
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />
        <ExchangeViews
          sendCurrency={sendCurrency}
          receiveCurrency={receiveCurrency}
          logEntries={logEntries}
          onDeleteLogItem={handleDeleteItem}
          sendAmount={sendAmount}
          compareEntries={compareEntries}
          onHandleClearAll={handleClearAll}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite }
        />
      </section>
    </main>
  );
}
