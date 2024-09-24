import { Link } from "react-router-dom";
import styles from "../../../header/header.module.css";

/**
 * NavButton bileşeni, bağlantı veya buton olarak çalışan bir navigasyon düğmesi oluşturur.
 * @param {string} imgSrc - Düğmede gösterilecek görüntünün kaynağı.
 * @param {string} altText - Görüntü için alternatif metin.
 * @param {string} text - Düğmenin üzerindeki metin.
 * @param {function} onClick - Butona tıklandığında çalıştırılacak işlev.
 * @param {string} link - Bağlantı varsa bu değeri alır, yoksa null olmalıdır.
 * @returns {JSX.Element} - Render edilen düğme veya bağlantı bileşeni.
 */

export default function NavButton({ imgSrc, altText, text, onClick, link }) {
  return link ? (
    // Eğer bir bağlantı varsa, Link bileşeni kullanarak render et
    <Link to={link} className={styles.navButton}>
      <img className={styles.linkLogo} src={imgSrc} alt={altText} />
      <h4>{text}</h4>
    </Link>
  ) : (
    // Bağlantı yoksa, buton olarak render et
    <button onClick={onClick} className={styles.navButton}>
      <img src={imgSrc} alt={altText} />
      <h4>{text}</h4>
    </button>
  );
}
