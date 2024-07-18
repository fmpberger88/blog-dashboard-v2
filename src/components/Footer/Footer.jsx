import styles from './Footer.module.css';

const Footer = () => {
    // Get current year
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.linkContainer}>
                <p>© {currentYear} | <a href="https://www.fmpberger.com">fmpberger.com</a></p>
            </div>
            <div className={styles.iconsContainer}>
                <a href="https://www.linkedin.com/in/fabian-berger-80003ba6/" target="_blank" rel="noopener noreferrer"
                   aria-label="Linkedin">
                    <i className="fab fa-linkedin"></i>
                </a>
                <a href="https://github.com/fmpberger88" target="_blank" rel="noopener noreferrer" aria-label="Github">
                    <i className="fab fa-github"></i>
                </a>
                <a href="https://www.researchgate.net/profile/Fabian-Berger-2" target="_blank" rel="noopener noreferrer"
                   aria-label="ResearchGate">
                    <i className="fab fa-researchgate"></i>
                </a>
            </div>
        </footer>
    )
};

export default Footer;