import styles from './Modal.module.css';

const Modal = ({ open, title, message, onClose, onConfirm }) => {
    if (!open) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContainer}>
                <h2 className={styles.modalTitle}>{title}</h2>
                <p className={styles.modalMessage}>{message}</p>
                <div className={styles.modalActions}>
                    <button className={styles.modalButton} onClick={onClose}>
                        Cancel
                    </button>
                    <button className={styles.modalButton} onClick={onConfirm}>
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
