import styles from "./CurrencyConverter.module.css";

export default function CurrencyConverter() {
  return (
    <section className={styles.currencyCon}>
      <h3>CHECK THE RATE</h3>
      <main className={styles.converterField}>
        <div className={styles.sendField}>
          {/* Send Input Group */}
          <div className={styles.inputGroup}>
            <label htmlFor="send-amount" className={styles.label}>SEND</label>
            <div className={styles.inputWrapper}>
              <input 
                type="text" 
                id="send-amount" 
                defaultValue="1,000" 
                className={styles.input}
              />
              <button type="button" className={styles.currencySelect}>
                <img src="/us-flag.png" alt="USD Flag" className={styles.flagIcon} />
                <span>USD</span>
                <span className={styles.dropdownArrow}>▼</span>
              </button>
            </div>
          </div>

          {/* Swap Button */}
          <button type="button" className={styles.swapBtn} aria-label="Swap currencies">
            ⇄
          </button>

          {/* Receive Input Group */}
          <div className={styles.inputGroup}>
            <label htmlFor="receive-amount" className={styles.label}>RECEIVE</label>
            <div className={styles.inputWrapper}>
              <input 
                type="text" 
                id="receive-amount" 
                defaultValue="853.02" 
                readOnly 
                className={styles.input}
              />
              <button type="button" className={styles.currencySelect}>
                <span className={styles.currencySymbol}>€</span>
                <span>EUR</span>
                <span className={styles.dropdownArrow}>▼</span>
              </button>
            </div>
          </div>

        </div>
              
        
      </main>
    </section>
  );
}
