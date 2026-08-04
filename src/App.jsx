import Header from "./components/layout/Header/Header";
import Sliderate from "./components/layout/Sliderate/Sliderate";
import CurrencyConverter from "./feature/exchange/components/CurrencyConverter/CurrencyConverter";
import ExchangeViews from './feature/exchange/components/Tabs/ExchangeViews';

export default function App() {
  return (
    <main>
      <Header />
      <Sliderate />
      <section className="app-shell">
        <CurrencyConverter />
        <ExchangeViews />
      </section>
    </main>
  );
}
