import { useState } from 'react'
import styles from './Tabs.module.css'
import ExchangeHistory from './exhangeHistory/ExchangeHistory'
// import ComparePage from './comparePage/ComparePage'
// import FavoritesPage from './favoritesPage/FavoritesPage'
// import LogPage from './LogPage/LogPage'


export default function Tabs({ activeTab, onTabChange }) {

    const [selectedTab, setSelectedTab] = useState(activeTab || 'history');
    const tabs = [
    { id: 'history', label: 'HISTORY' },
    { id: 'compare', label: 'COMPARE' },
    { id: 'favorites', label: 'FAVORITES', count: 10 },
    { id: 'log', label: 'LOG', count: 0 },
    ];


    const handleTabClick = (tabId) => {
    setSelectedTab(tabId);
    if (onTabChange) {
      onTabChange(tabId);
    }
  };
    return (
    <>
    <nav className={styles.tabsContainer}>
      <ul className={styles.tabsList}>
        {tabs.map((tab) => {
          const isActive = selectedTab === tab.id;
          return (
            <li key={tab.id} className={styles.tabItem}>
              <button
                type="button"
                onClick={() => handleTabClick(tab.id)}
                className={`${styles.tabButton} ${isActive ? styles.active : ''}`}
              >
                <span>{tab.label}</span>
                
                {/* Render pill badge if count exists */}
                {tab.count !== undefined && (
                  <span className={`${styles.badge} ${isActive ? styles.activeBadge : ''}`}>
                    {tab.count}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
      
            </nav>

            {selectedTab && <ExchangeHistory/> }
    </>
  )
}
