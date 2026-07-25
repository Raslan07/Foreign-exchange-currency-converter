import styles from "./Header.module.css";
export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className="icons-logo">
          <img src="/src/assets/Logo.png" alt="logo-icon" />
        </div>
        <div className="texts-currency">
          <h4>55 CURRENCIES · EOD · ECB DATA</h4>
        </div>
      </div>
    </header>
  );
}
