import styles from "../../header/header.module.css"; //css import
import logo from "../../../assets/image/logo.png"; //logo görseli

export default function Logo() {
  return (
    <div className={styles.logoContainer}>
      <img src={logo} alt="Plane scape pic" />
      <h1>plane scape</h1> {/*uygulamanın adı*/}
    </div>
  );
}
