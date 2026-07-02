import styles from './Button.module.css';

const buttonVariants = {
    primary: styles.primary, 
    secondary: styles.secondary,
    tab: styles.tab,
    timeToggle: styles.timeToggle,
}
const ButtonBoolen = {
    isActive : true
}

export default function Button({ children, variant = 'primary' }) {
    return (
        <button className={`${styles.button} ${buttonVariants[variant]}`}>
            { children}
        </button>
    )
}
