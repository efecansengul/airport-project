import styles from "../../header/header.module.css";
import NavButton from "./navButton/navButton";

import deals from "../../../assets/image/deals.png";
import discover from "../../../assets/image/discover.png";
import user from "../../../assets/image/user.png";
import planeAnime from "../../../assets/image/planeAnime.png";
export default function Menu({ handleClick }) {
  return (
    <ul className={styles.navItems}>
      <li className={styles.navItem}>
        <NavButton
          imgSrc={deals}
          altText="Deals pic"
          text="Deals"
          onClick={handleClick}
        />
      </li>
      <li className={styles.navItem}>
        <NavButton
          imgSrc={discover}
          altText="Discover pic"
          text="Discover"
          onClick={handleClick}
        />
      </li>
      <li className={styles.navItem}>
        <NavButton
          link="/myflights"
          text="My Flights"
          imgSrc={planeAnime}
          altText="plane"
        />
      </li>
      <li className={styles.navItem}>
        <NavButton
          imgSrc={user}
          altText="Profile pic"
          text="Joane Smith"
          onClick={handleClick}
        />
      </li>
    </ul>
  );
}
