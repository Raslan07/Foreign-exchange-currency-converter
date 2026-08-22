import { useState } from "react";
import Tabs from "./Tabs";
import ExchangeHistory from "./exhangeHistory/ExchangeHistory";
import ComparePage from "./comparePage/ComparePage";
import FavoritesPage from "./favoritesPage/FavoritesPage";
import LogPage from "./LogPage/LogPage";

function resolveView(
  activeTab,
  favorites,
  logEntries,
  sendCurrency,
  receiveCurrency,
  handleDeleteItem,
  sendAmount,
  compareEntries,
  handleClearAll,
  onToggleFavorite
) {
  switch (activeTab) {
    case "compare":
      return (
        <ComparePage
          sendCurrency={sendCurrency}
          sendAmount={sendAmount}
          compareEntries={compareEntries}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}      />
      );
    case "favorites":
      return <FavoritesPage favorites={favorites} onToggleFavorite={onToggleFavorite} />;
    case "log":
      return <LogPage logs={logEntries} onDeleteLogItem={handleDeleteItem} onHandleClearAll={handleClearAll} />;
    case "history":
    default:
      return (
        <ExchangeHistory
          sendCurrency={sendCurrency}
          receiveCurrency={receiveCurrency}
        />
      );
  }
}

export default function ExchangeViews({
  sendCurrency,
  receiveCurrency,
  logEntries = [],
  favorites = [],
  compareEntries = [] ,
  onDeleteLogItem,
  sendAmount,
  onHandleClearAll,
  
  onToggleFavorite
}) {
  const [activeTab, setActiveTab] = useState("history");

  const view = resolveView(
    activeTab,
    favorites,
    logEntries,
    sendCurrency,
    receiveCurrency,
    onDeleteLogItem,
    sendAmount, 
    compareEntries,
    onHandleClearAll,
    onToggleFavorite
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
