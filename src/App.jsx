import Header from "./components/layout/Header/Header";
import Sliderate from "./components/layout/Silderate/Silderate;";
import CurrencyConverter from "./feature/exchange/components/CurrencyConverter/CurrencyConverter";
import Tabs from './feature/exchange/components/Tabs/Tabs'

export default function App() {
  return (
    <main>
      <Header />
      <Sliderate />
      <CurrencyConverter />
      <Tabs/>
      
    </main>
  );
}
