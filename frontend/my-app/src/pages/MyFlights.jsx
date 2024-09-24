import { useLoaderData } from "react-router-dom";
import { useState, useEffect } from "react";
import { getMyFlights } from "../api/myflights"; //ucus verilerini almak icin fonksiyon
import { fetchAirlines } from "../api/airlines"; // Havayolu verilerini almak için API fonksiyonu
import styles from "./MyFlights.module.css";
import blackstar from "../assets/image/blackstar.png";
import graystar from "../assets/image/graystar.png";
import info from "../assets/image/info.png";

import FlightItem from "../components/myflight-components/flightsItem"; //ucus bileseni

export default function MyFlightsPage() {
  const [airlines, setAirlines] = useState([]); //havayollarını tutmak icin state
  const [hasFetchedAirlines, setHasFetchedAirlines] = useState(false); // Havayolu verisinin alınıp alınmadığını kontrol etmek için
  const [flights, setFlights] = useState(useLoaderData()); // Uçuş verilerini yükleme
  useEffect(() => {
    if (!hasFetchedAirlines) {
      // Eğer daha önce veri alınmadıysa
      const getAirlinesData = async () => {
        try {
          const data = await fetchAirlines();
          setAirlines(data);
          setHasFetchedAirlines(true); // Veri alındıktan sonra bunu true yap
        } catch (error) {
          console.error("Error fetching airlines:", error);
        }
      };
      getAirlinesData();
    }
  }, [hasFetchedAirlines]);

  const updateFlights = async () => {
    // Uçuşları güncelleme işlemi
    const result = await getMyFlights(); // API'den güncellenmiş uçuşları al
    if (result.success) {
      setFlights(result.flights);
    } else {
      console.error("Uçuş güncellenirken hata:", result.message);
    }
  };
  console.log("apiden dönen ucuslkarın", flights);

  return (
    <main className={styles.myFlightPage}>
      <header className={styles.myflightsHeader}>
        <div className={styles.clickAndSearch}>
          <p>Times</p>
          <p>Stops</p>
          <p>Airlines</p>
          <p>Airports</p>
          <p>Amenities</p>
          <select id="sortOptions" className={styles.searchOption}>
            <option value="edit search">Edit Search</option>
          </select>
        </div>
        <div className={styles.starsContainer}>
          {/* 1. Sütun */}
          <div className={styles.column}>
            <img src={blackstar} alt="Star black" className={styles.star} />
            <img src={blackstar} alt="Star black" className={styles.star} />
            <img src={graystar} alt="Star gray" className={styles.star} />
            <img src={graystar} alt="Star gray" className={styles.star} />
            <img src={graystar} alt="Star gray" className={styles.star} />
            <img src={graystar} alt="Star gray" className={styles.star} />
          </div>
          <div className={styles.separator} />
          {/* 2. Sütun */}
          <div className={styles.column}>
            <img src={blackstar} alt="Star black" className={styles.star} />
            <img src={blackstar} alt="Star black" className={styles.star} />
            <img src={blackstar} alt="Star black" className={styles.star} />
            <img src={graystar} alt="Star gray" className={styles.star} />
            <img src={graystar} alt="Star gray" className={styles.star} />
            <img src={graystar} alt="Star gray" className={styles.star} />
          </div>
          <div className={styles.separator} />
          {/* 3. Sütun */}
          <div className={styles.column}>
            <img src={blackstar} alt="Star black" className={styles.star} />
            <img src={blackstar} alt="Star black" className={styles.star} />
            <img src={blackstar} alt="Star black" className={styles.star} />
            <img src={blackstar} alt="Star black" className={styles.star} />
            <img src={graystar} alt="Star gray" className={styles.star} />
            <img src={graystar} alt="Star gray" className={styles.star} />
          </div>
          <div className={styles.separator} />
          {/* 4. Sütun */}
          <div className={styles.column}>
            <img src={blackstar} alt="Star black" className={styles.star} />
            <img src={blackstar} alt="Star black" className={styles.star} />
            <img src={blackstar} alt="Star black" className={styles.star} />
            <img src={blackstar} alt="Star black" className={styles.star} />
            <img src={blackstar} alt="Star black" className={styles.star} />
            <img src={graystar} alt="Star gray" className={styles.star} />
          </div>
          <div className={styles.separator} />
          {/* 5. Sütun */}
          <div className={styles.column}>
            <img src={blackstar} alt="Star black" className={styles.star} />
            <img src={blackstar} alt="Star black" className={styles.star} />
            <img src={blackstar} alt="Star black" className={styles.star} />
            <img src={blackstar} alt="Star black" className={styles.star} />
            <img src={blackstar} alt="Star black" className={styles.star} />
            <img src={blackstar} alt="Star black" className={styles.star} />
          </div>
        </div>
      </header>
      <section>
        <div className={styles.recomemdedContainer}>
          <div className={styles.searchContainer}>
            <label>Sort by:</label>
            <select id="sortOptions" className={styles.searchOption}>
              <option value="recomended">Recomended</option>
            </select>
          </div>

          <div className={styles.info}>
            <img src={info} alt="info pic" />
            <p>Avg Fare:$225</p>
          </div>
        </div>

        <ul className={styles.flightsContainer}>
          {flights.length < 1 && <p>Hicbir ucusunuz yok</p>}{" "}
          {/* Uçuş yoksa mesaj */}
          {flights.length > 0 &&
            flights.map((flight) => (
              <FlightItem
                key={flight.id}
                flight={flight}
                airlines={airlines}
                updateFlights={updateFlights}
              /> // FlightItem bileşenini kullan
            ))}
        </ul>
      </section>
    </main>
  );
}

// Loader fonksiyonu: Uçuşları yüklemek için

export async function getFlightsLoader() {
  const result = await getMyFlights(); //apiden ucus verilerini al
  if (!result.success) {
    throw new Error(
      result.message || "Uçuş bilgilerini yükleme sırasında hata oluştu."
    );
  }
  return result.flights;
}
