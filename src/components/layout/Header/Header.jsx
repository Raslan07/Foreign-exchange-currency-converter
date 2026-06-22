
import styles  from './Header.module.css';
export default function Header(){

    return (
        <header className={styles.header}>
            <div className={styles.container}> 
                <div className="icons-logo">
                    <img src='/src/assets/Logo.png' alt="logo-icon" />
                </div>
                <div className="texts-currency">
                    <p>
                    55 CURRENCIES · EOD · ECB DATA
                    </p>
                </div>
            </div>
        </header>
    )
}

