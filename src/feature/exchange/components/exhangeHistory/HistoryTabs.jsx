import { useState } from 'react'
import styles from './ExchangeHistory.module.css'
export default function HistoryTabs({ activeTab, onTabChange ,children }) {

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
      { children}
    </nav>
  )
}
