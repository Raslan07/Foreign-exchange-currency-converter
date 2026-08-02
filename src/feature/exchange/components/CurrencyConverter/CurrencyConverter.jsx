import { useState } from "react";
import styles from "./CurrencyConverter.module.css";

export default function CurrencyConverter() {
  const [sendAmount, setSendAmount] = useState("1,000");
  const [receiveAmount, setReceiveAmount] = useState("853.02");
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
                value={sendAmount}
                onChange={(e) => setSendAmount(e.target.value)}
                className={styles.input}
              />
              <button type="button" className={styles.currencySelect}>
                {/* <img src="/us-flag.png" alt="USD Flag" className={styles.flagIcon} /> */}
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
                value={receiveAmount}
                onChange={(e) => setReceiveAmount(e.target.value)}
                className={styles.input}
              />
              <button type="button" className={styles.currencySelect}>
                
                <span>EUR</span>
                <span className={styles.dropdownArrow}>▼</span>
              </button>
            </div>
          </div>
        </div>

              
        {/* Dotted Splite line */}
        <div className={styles.splittedLine}></div>

    {/* Footer Converter Line */}
        <div className={styles.converterFooter}>
      {/* Exchange Rate Info */}
      <span className={styles.rateInfo}>1 USD = 0.8530 EUR</span>

      {/* Action Buttons Group */}
      <div className={styles.actionButtons}>
        <button type="button" className={styles.btnFavorited}>
          <span className={styles.starIcon}>★</span> FAVORITED
        </button>
        
        <button type="button" className={styles.btnLog}>
          LOG CONVERSION
        </button>
      </div>
    </div>
      </main>
    </section>
  );
}
