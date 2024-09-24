import styles from "./showResources.module.css";
import carTrip from "../../assets/image/carTrip.jpg";
import hotel from "../../assets/image/hotel.jpg";
import travelbag from "../../assets/image/travelbag.jpg";
import carlogo from "../../assets/image/car.png";
import hotellogo from "../../assets/image/hotel.png";
import beachlogo from "../../assets/image/beach.png";
export default function ShowResources() {
  return (
    <aside className={styles.content4}>
      <div className={styles.resourceItem}>
        <div>
          <img className={styles.logo} src={carlogo} alt="car logo pic" />
          <img src={carTrip} alt="Car Rental pic" />
          <h1>CAR RENTALS</h1>
        </div>
        <div>
          <img className={styles.logo} src={hotellogo} alt="hotel logo pic" />
          <img src={hotel} alt="Hotel pic" />
          <h1>HOTELS</h1>
        </div>
        <div>
          <img className={styles.logo} src={beachlogo} alt="beach logo pic" />
          <img src={travelbag} alt="taravel packages pic" />
          <h1>TRAVEL PACKAGES</h1>
        </div>
      </div>
    </aside>
  );
}
