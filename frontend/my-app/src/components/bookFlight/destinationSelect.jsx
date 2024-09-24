import { useEffect, useState } from "react";
import styles from "./bookFlight.module.css";
import landing from "../../assets/image/landing.png";
import { getCountryByAirportCode } from "../../../utils/airPortData";
export default function DestinationSelect({
  selectedDeparture,
  selectedDestination,
  setSelectedDestination,
  routeDestinations,
  setSearchTerm,
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredDestinations, setFilteredDestinations] =
    useState(routeDestinations);

  // routeDestinations değiştiğinde filteredDestinations'ı güncelle
  useEffect(() => {
    setFilteredDestinations(routeDestinations);
  }, [routeDestinations]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    console.log(value);
    setShowDropdown(value.length > 0); // Dropdown'u inputa göre aç/kapa
    // Filtreleme işlemi
    const results = routeDestinations.filter((destination) =>
      destination.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredDestinations(results);
    setSelectedDestination(value);
  };

  const handleSelect = (airport) => {
    setSelectedDestination(airport);
    setSearchTerm(""); // Seçim yapıldığında arama terimini temizle
    setShowDropdown(false); // Seçim sonrası dropdown'u kapat
  };

  return (
    <div className={styles.destinationSelectContainer}>
      <div className={styles.inputWrapper}>
        <input
          type="text"
          value={selectedDestination}
          onChange={handleInputChange}
          onFocus={() => setShowDropdown(true)}
          className={styles.inputDestination}
          placeholder="Destination Airport"
          disabled={selectedDeparture !== "AMS"}
        />
        <img src={landing} alt="landing pic" className={styles.logo} />
        {showDropdown && filteredDestinations.length > 0 && (
          <ul className={styles.dropdown}>
            {filteredDestinations.map((airport, index) => (
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
