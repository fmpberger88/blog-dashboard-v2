// src/components/ErrorMessage/ErrorMessage.jsx
import styles from './SuccessMessage.module.css';

const SuccessMessage = ({ message }) => {
    return (
        <div className={styles.errorContainer}>
            <div className={styles.errorBox}>
                <div className={styles.errorTitle}>Something went wrong</div>
                <div className={styles.errorMessage}>{message}</div>
            </div>
        </div>
    );
}

export default SuccessMessage;
