import styles from "./modal.module.css";
function Modal({ message, onClose }) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <p>{message}</p>
        <button className={styles.closeButton} onClick={onClose}>
          Kapat
        </button>
      </div>
    </div>
  );
}
export default Modal;
