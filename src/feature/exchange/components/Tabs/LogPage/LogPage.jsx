import styles from "./LogPage.module.css";
import EmptyLogPage from "./EmptyLogPage";
export default function LogPage({ logs = [], onDeleteLogItem , onHandleClearAll }) {
  function handleDeleteItem(id) {
    if (onDeleteLogItem) {
      onDeleteLogItem(id);
    }
  }
  function handelClearAll(logs) {
    if (onHandleClearAll) {
      onHandleClearAll(logs);
    }
  }
  return (
    <>
      {logs.length === 0 ? (
        <EmptyLogPage />
      ) : (
        <div className={styles.card}>
          <div className={styles.header}>
            <h3 className={styles.title}>CONVERSION LOG</h3>
            <div className={styles.controls}>
              <span className={styles.countText}>{logs.length} LOGGED</span>
              <button
                type="button"
                onClick={()=> handelClearAll(logs)}
                disabled={logs.length === 0}
                className={styles.clearBtn}
              >
                CLEAR ALL
              </button>
            </div>
          </div>

          {logs.length > 0 ? (
            <div className={styles.list}>
              {logs.map((item) => (
                <div key={item.id} className={styles.row}>
                  <div className={styles.leftGroup}>
                    <span className={styles.timeTag}>{item.time}</span>
                    <span className={styles.pairText}>
                      {item.fromCurrency}{" "}
                      <span className={styles.arrow}>→</span> {item.toCurrency}
                    </span>
                  </div>

                  <div className={styles.rightGroup}>
                    <span className={styles.sentValue}>{item.sentAmount}</span>
                    <span className={styles.receivedValue}>
                      {item.receivedAmount}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDeleteItem(item.id)}
                      className={styles.deleteBtn}
                      title="Delete Log Entry"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <polyline points="3 6 5 6 21 6" />
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              No conversion history logged yet.
            </div>
          )}
        </div>
      )}
    </>
  );
}
