import { useState } from 'react';
import Tabs from './Tabs';
import ExchangeHistory from './exhangeHistory/ExchangeHistory';
import ComparePage from './comparePage/ComparePage';
import FavoritesPage from './favoritesPage/FavoritesPage';
import LogPage from './LogPage/LogPage';

function resolveView(activeTab, favorites, logEntries, sendCurrency, receiveCurrency, handleDeleteItem) {
  switch (activeTab) {
    case 'compare':
      return <ComparePage />;
    case 'favorites':
      return <FavoritesPage favorites={favorites} />;
    case 'log':
      return <LogPage logs={logEntries} onDeleteLogItem={handleDeleteItem} />;
    case 'history':
    default:
      return <ExchangeHistory sendCurrency={sendCurrency} receiveCurrency={receiveCurrency} />;
  }
}

export default function ExchangeViews({
  sendCurrency,
  receiveCurrency,
  logEntries = [],
  favorites = [],
  onDeleteLogItem,
}) {
  const [activeTab, setActiveTab] = useState('history');

  const view = resolveView(
    activeTab,
    favorites,
    logEntries,
    sendCurrency,
    receiveCurrency,
    onDeleteLogItem,
  );

  return (
    <>
      <Tabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        favoritesCount={favorites.length}
        logCount={logEntries.length}
      />
      {view}
    </>
  );
}
