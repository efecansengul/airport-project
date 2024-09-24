import styles from "./bookFlight.module.css";
export default function ToggleButton({
  whichButton, //hangi buton oldugunu tutuyorum
  isActive, //arka plan icin active durumu
  onClick, //tıklanma durumu
  label,
}) {
  return (
    <button
      className={`${styles.button} ${styles[whichButton]} ${
        isActive ? styles.active : ""
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
