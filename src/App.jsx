import Header from "./components/layout/Header/Header";
import Sliderate from "./components/layout/Silderate/Silderate;";
import CurrencyConverter from "./feature/exchange/components/CurrencyConverter/CurrencyConverter";
import ExchangeHistory from './feature/exchange/components/exhangeHistory/ExchangeHistory'
export default function App() {
  return (
    <main>
      <Header />
      <Sliderate />
      <CurrencyConverter />
      <ExchangeHistory/>
    </main>
  );
}
