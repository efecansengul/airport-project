import styles from "./showFlights.module.css";
import { getCountryByAirportCode } from "../../../utils/airPortData";
import {
  formatScheduleTime,
  calculateAdjustedTime,
} from "../../../utils/calculatedtime.js";
import { getAirlinePublicName } from "../../../utils/airlineHelpers.js";
//import { fetchAirlines } from "../../api/airlines";
import { useState, useEffect } from "react";
import { postMyFlights } from "../../api/myflights";
import planeAnime from "../../assets/image/planeAnime.png";
import landingBooking from "../../assets/image/landingBooking.png";
import landingBooking2 from "../../assets/image/landingBooking2.png";
import Modal from "./UI/modal.jsx";
export default function ShowFlights({
  flights,
  airlines,
  setSelectedAirlines,
  loading,
  error,
  clickBookButton,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  console.log("Received flights:", flights);

  // Her uçuşun airline ismini setSelectedAirlines'e ekledim
  useEffect(() => {
    const airlineNames = [];
    flights.forEach((flight) => {
      const airlineName = getAirlinePublicName(flight.prefixICAO, airlines);
      //bilinmeyen havayollarını atla ve unknown yaz
      if (airlineName !== "Unknown" && !airlineNames.includes(airlineName)) {
        airlineNames.push(airlineName);
      }
    });

    setSelectedAirlines(airlineNames);
  }, [flights, airlines, setSelectedAirlines]);
  //ucus kaydetme islemi
  async function handleFlightSave(choosenflight) {
    const result = await postMyFlights(choosenflight);
    //console.log(result.message);

    // Modal mesajını duruma göre ayarla
    if (result.success) {
      setModalMessage("Ucusunuz basari ile kaydedildi.");
    } else {
      if (result.message == "Bu ucus zaten kaydedilmiştir.") {
        setModalMessage("Bu uçuş zaten kaydedilmiş.");
      } else {
        setModalMessage("Uçuşunuz kaydedilirken bir hata meydana geldi.");
      }
    }
    setIsModalOpen(true);
  }

  //modal acma kapama fonksiyonu
  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <section className={styles.content2}>
      {loading && <p>Yükleniyor...</p>}
      {/* Loading durumu */}
      {error && <p>{error}</p>} {/* Error durumu */}
      {!loading && clickBookButton && <p>Seçimlerinizi getiriyoruz...</p>}
      {!clickBookButton && flights.length < 1 && !loading && !error && (
        <p>Herhangi bir seçim yapmadınız.</p>
      )}
      {/* Uçuş bulunamadığında bu mesajı göster */}
      {!loading && flights.length === 0 && clickBookButton && !error && (
        <p>Aradığınız uçak bulunamadı.</p>
      )}
      <ul>
        {flights.map((flight) => {
          const isDeparture = flight.flightDirection === "D";
          const leftLocation = isDeparture
            ? "AMS"
            : flight.route.destinations[0];
          const rightLocation = isDeparture
            ? flight.route.destinations[0]
            : "AMS";

          const leftCountry =
            leftLocation === "AMS"
              ? "Amsterdam"
              : getCountryByAirportCode(leftLocation);
          const rightCountry =
            rightLocation === "AMS"
              ? "Amsterdam"
              : getCountryByAirportCode(rightLocation);

          const {
            displayHour: leftHour,
            displayMinute: leftMinute,
            period: leftPeriod,
          } = formatScheduleTime(flight.scheduleTime);
          const formattedLeftTime = `${leftHour}:${leftMinute} ${leftPeriod}`;

          const adjustedTime = calculateAdjustedTime(
            flight.scheduleTime,
            isDeparture
          );
          const {
            displayHour: rightHour,
            displayMinute: rightMinute,
            period: rightPeriod,
          } = formatScheduleTime(adjustedTime.toTimeString().slice(0, 8)); // Adjusted time'ı formatla
          const formattedRightTime = `${rightHour}:${rightMinute} ${rightPeriod}`;

          return (
            <li key={flight.id}>
              <main className={styles.main}>
                <div
                  className={styles.country}
                >{`${leftCountry}-${rightCountry}`}</div>
                <div className={styles.bookHero}>
                  <div className={styles.rightTimeContainer}>
                    <div className={styles.imageDeparture}>
                      <img
                        src={landingBooking}
                        alt="landingBooking pic"
                        className={styles.imageLanding}
                      />
                      Departure
                    </div>
                    <div className={styles.formattedTime}>
                      {formattedLeftTime}
                    </div>
                    <div>Airport: {leftLocation}</div>
                  </div>
                  <div className={styles.line}></div>
                  <div>
                    <div>
                      {getAirlinePublicName(flight.prefixICAO, airlines)}
                    </div>
                    <div>
                      <img
                        src={planeAnime}
                        alt="animeplane pic"
                        className={styles.planeAnime}
                      />
                    </div>
                    <div>2h 25m (NonStop)</div>
                  </div>
                  <div className={styles.line}></div>
                  <div className={styles.leftTimeContainer}>
                    <div className={styles.imageArrival}>
                      <img
                        src={landingBooking2}
                        alt="landingBooking2 pic"
                        className={styles.imgLanding}
                      />
                      Arrival
                    </div>
                    <div className={styles.formattedTime}>
                      {formattedRightTime}
                    </div>
                    <div>Airport: {rightLocation}</div>
                  </div>
                </div>
                <div className={styles.bookPriceContanier}>
                  <div className={styles.price}>
                    <p className={styles.boldPrice}>Price: $200</p>
                    <p className={styles.roundTrip}>Round Trip</p>
                  </div>
                  <div>
                    <button
                      onClick={() => handleFlightSave(flight)}
                      className={styles.bookFlightButton}
                    >
                      BookFlight
                    </button>
                  </div>
                </div>
              </main>
              <button className={styles.checkDetails}>Check the details</button>
            </li>
          );
        })}
      </ul>
      {isModalOpen && <Modal message={modalMessage} onClose={closeModal} />}
    </section>
  );
}
