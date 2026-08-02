import { useEffect, useState } from 'react';
import Tabs from './Tabs';
import ExchangeHistory from './exhangeHistory/ExchangeHistory';
import ComparePage from './comparePage/ComparePage';
import FavoritesPage from './favoritesPage/FavoritesPage';
import LogPage from './LogPage/LogPage';
import { readStoredList, writeStoredList } from './storage';

const FAVORITES_KEY = 'fx-checker-favorites';
const LOG_KEY = 'fx-checker-log';

function resolveView(activeTab, favorites, logEntries) {
  switch (activeTab) {
    case 'compare':
      return <ComparePage />;
    case 'favorites':
      return <FavoritesPage favorites={favorites} />;
    case 'log':
      return <LogPage logEntries={logEntries} />;
    case 'history':
    default:
      return <ExchangeHistory />;
  }
}

export default function ExchangeViews() {
  const [activeTab, setActiveTab] = useState('history');
  const [favorites, setFavorites] = useState(() => readStoredList(FAVORITES_KEY, []));
  const [logEntries, setLogEntries] = useState(() => readStoredList(LOG_KEY, []));

  useEffect(() => {
    writeStoredList(FAVORITES_KEY, favorites);
  }, [favorites]);

  useEffect(() => {
    writeStoredList(LOG_KEY, logEntries);
  }, [logEntries]);

  const view = resolveView(activeTab, favorites, logEntries);

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
