import { useState } from "react";
import styles from "./bookFlight.module.css";
import takingoff from "../../assets/image/takingoff.png";
import { getCountryByAirportCode } from "../../../utils/airPortData";
export default function DepartureSelect({
  selectedDeparture,
  setSelectedDeparture,
  airports,
  setSearchTerm, // Arama terimini almak için props
}) {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleInputChange = (e) => {
    setSelectedDeparture(e.target.value);
    setSearchTerm(e.target.value);
    setShowDropdown(e.target.value.length > 0); // Dropdown'u inputa göre aç/kapa
  };

  const handleSelect = (airport) => {
    setSelectedDeparture(airport);
    setSearchTerm(""); // Seçim yapıldığında arama terimini temizle
    setShowDropdown(false); // Seçim sonrası dropdown'u kapat
  };

  return (
    <div className={styles.departureSelectContainer}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          value={selectedDeparture}
          onChange={handleInputChange}
          onFocus={() => setShowDropdown(true)}
          className={styles.inputDeparture}
          placeholder="Departure Airport"
        />
        <img src={takingoff} alt="takingoff pic" className={styles.logo} />
        {showDropdown && airports.length > 0 && (
          <ul className={styles.dropdown}>
            {airports.map((airport, index) => (
              <li
                key={index}
                onClick={() => handleSelect(airport)}
                className={styles.dropdownItem}
              >
                {airport === "AMS"
                  ? "Schiphol Airport (AMS)"
                  : `${airport} (${getCountryByAirportCode(airport)})`}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
