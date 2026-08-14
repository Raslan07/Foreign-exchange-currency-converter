import styles from "./Tabs.module.css";

const tabs = [
  { id: "history", label: "HISTORY" },
  { id: "compare", label: "COMPARE" },
  { id: "favorites", label: "FAVORITES" },
  { id: "log", label: "LOG" },
];

export default function Tabs({
  activeTab,
  onTabChange,
  favoritesCount,
  logCount,
}) {
  const handleTabClick = (tabId) => {
    onTabChange(tabId);
  };

  return (
    <nav className={styles.tabsContainer}>
      <ul className={styles.tabsList}>
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const count =
            tab.id === "favorites"
              ? favoritesCount
              : tab.id === "log"
                ? logCount
                : undefined;

          return (
            <li key={tab.id} className={styles.tabItem}>
              <button
                type="button"
                onClick={() => handleTabClick(tab.id)}
                className={`${styles.tabButton} ${isActive ? styles.active : ""}`}
              >
                <span>{tab.label}</span>

                {count !== undefined && (
                  <span
                    className={`${styles.badge} ${isActive ? styles.activeBadge : ""}`}
                  >
                    {count}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
