import { useState, memo } from "react";
import classes from "./sortBy.module.css";

// Sıralama filtreleme işlemi (tekrar bak)
const SortBy = memo(({ flights, setFlights, selectedAirlines }) => {
  const [sortedFlights, setSortedFlights] = useState(flights); // Sıralanmış uçuşlar için state

  const handleSort = (e) => {
    const option = e.target.value;

    let newSortedFlights = [...flights]; // flights listesinin kopyasını al

    //burayı düsün

    if (option === "lowestPrice") {
      newSortedFlights.sort((a, b) => a.price - b.price); // Fiyatı düşükten yükseğe sırala
    }
    setSortedFlights(newSortedFlights);
    setFlights(newSortedFlights); // HomePage'deki flights state'ini güncelle
  };

  const handleCheckboxChange = (airline, checked) => {
    let newSortedFlights;
    if (checked) {
      newSortedFlights = flights.filter((flight) => flight.airline === airline);
    } else {
      // Eğer checkbox unchecked ise, tüm uçuşları geri getir
      newSortedFlights = [...flights];
    }

    setSortedFlights(newSortedFlights);
    setFlights(newSortedFlights);
  };

  return (
    <section className={classes.content3}>
      <div className={classes.sortContainer}>
        <div className={classes.sortPrice}>
          <div>
            <label htmlFor="sortOptions">Sort by: </label>
            <select id="sortOptions" onChange={handleSort}>
              <option value="lowestPrice">Lowest Price</option>
            </select>
          </div>
        </div>
        <div className={classes.timeContainer}>
          <p>Arrival Time</p>

          <div className={classes.checkboxContainer}>
            <input type="checkbox" id="time-morning" value="morning" />
            <label htmlFor="time-morning">5:00 AM - 11:59 AM</label>
          </div>

          <div className={classes.checkboxContainer}>
            <input type="checkbox" id="time-afternoon" value="afternoon" />
            <label htmlFor="time-afternoon">12:00 PM - 5:59 PM</label>
          </div>
        </div>
      </div>
      <div className={classes.stopContainer}>
        <p>Stops</p>
        <div className={classes.checkboxContainer}>
          <input type="checkbox" id="nonstop" value="nonstop" />
          <div className={classes.labelContainer}>
            <label htmlFor="nonstop">Nonstop</label>
            <label>$230</label>
          </div>
        </div>

        <div className={classes.checkboxContainer}>
          <input type="checkbox" id="one-stop" value="one-stop" />
          <div className={classes.labelContainer}>
            <label htmlFor="one-stop">1 Stop</label>
            <label>$230</label>
          </div>
        </div>

        <div className={classes.checkboxContainer}>
          <input type="checkbox" id="two-plus-stops" value="two-plus-stops" />
          <div className={classes.labelContainer}>
            <label htmlFor="two-plus-stops">2+ Stops</label>
            <label>$230</label>
          </div>
        </div>
      </div>
      <div className={classes.airlineFilter}>
        <p>Filter by Airline</p>
        {selectedAirlines.map((airline, index) => (
          <div key={index} className={classes.checkboxContainer}>
            <input
              type="checkbox"
              id={`airline-${index}`}
              value={airline}
              // onChange={() => handleCheckboxChange(airline, e.target.checked)} //checkbox filtrelemesi
            />
            <div className={classes.labelContainer}>
              <label htmlFor={`airline-${index}`}>{airline}</label>
              <label>$230</label>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
});

export default SortBy;
