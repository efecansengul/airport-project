import styles from "./header.module.css";

import Logo from "./logo/logo.jsx";
import Menu from "./menu/menu.jsx";

/**
 * Header bileşeni, sayfanın üst kısmında yer alan başlık ve navigasyon menüsünü içerir.
 * @returns {JSX.Element} - Render edilen başlık bileşeni.
 */

export default function Header() {
  /**
   * handleClick işlevi, menü öğesine tıklandığında varsayılan davranışı engeller.
   * @param {MouseEvent} event - Tıklama olayını temsil eder.
   */
  function handleClick(event) {
    event.preventDefault(); // Varsayılan tıklama davranışını engelle
  }
  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        {/*Logo ve baslık*/}
        <Logo />

        {/*menu bölümü*/}
        <div className={styles.menuContainer}>
          <Menu handleClick={handleClick} />
        </div>
      </nav>
    </header>
  );
}
