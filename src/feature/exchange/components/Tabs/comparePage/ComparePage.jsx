
import EmptyComparePage from "./EmptyComparePage";
import styles from "./ComparePage.module.css";


export default function ComparePage({
  sendAmount ,
  sendCurrency ,
  compareEntries = [],
  favorites = [],
  onToggleFavorite
}) {
  const cleanString = String(sendAmount ?? "").replace(/,/g, "");
  const parsed = parseFloat(cleanString);

  const numAmount = Number.isNaN(parsed) ? 1000 : parsed;
  
  return (
    <>
      {compareEntries.length === 0 ? (
        <EmptyComparePage />
      ) : (
        <div className={styles.card}>
          <div className={styles.header}>
            <h3 className={styles.title}>
              MULTI-CURRENCY{" "}
              <span className={styles.highlightAmount}>{sendAmount}</span> FROM{" "}
              {sendCurrency}
            </h3>
            <span className={styles.countText}>{compareEntries.length} PAIRS</span>
          </div>

          <div className={styles.list}>
              {compareEntries.map((item) => {
              const isFavorite = favorites.some((entry) => entry.code === item.code);
              const totalValue = (numAmount * item.rate).toLocaleString(
                "en-US",
                {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                },
              );

              return (
                <div key={item.code} className={styles.row}>
                  <div className={styles.leftGroup}>
                    <img className={styles.flagBadge} src={item.flag} alt={item.name} />
                    <div className={styles.currencyInfo}>
                      <span className={styles.codeText}>{item.code}</span>
                      <span className={styles.nameText}>{item.name}</span>
                    </div>
                  </div>

                  <div className={styles.rightGroup}>
                    <div className={styles.valuesStack}>
                      <span className={styles.convertedValue}>
                        {totalValue}
                      </span>
                      <span className={styles.unitRate}>
                        @ {item.rate.toFixed(4)}
                      </span>
                    </div>

                    <button
                      type="button"
                      aria-pressed={isFavorite}
                      onClick={() => onToggleFavorite(item.code)}
                      className={`${styles.favBtn} ${isFavorite ? styles.favActive : ""}`}
                      title={
                        isFavorite
                          ? "Remove from favorites"
                          : "Add to favorites"
                      }
                    >
                      {isFavorite ? "★" : "☆"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.paginationFooter}>
            <div className={styles.paginationBox}>
              <button type="button" className={styles.pageBtn}>
                ‹
              </button>
              <span className={styles.divider}>|</span>
              <button type="button" className={styles.pageBtn}>
                ›
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
