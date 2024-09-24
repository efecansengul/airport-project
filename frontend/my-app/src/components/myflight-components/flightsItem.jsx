import {
  formatScheduleTime,
  calculateAdjustedTime,
} from "../../../utils/calculatedtime"; // Zaman formatlama ve ayarlama fonksiyonları(utils)
import { getAirlinePublicName } from "../../../utils/airlineHelpers.js"; // Havayolu adını almak için yardımcı fonksiyonu
import { formatDateTime } from "../../../utils/formatDateTime.js"; // Tarih ve zaman formatlama fonksiyonu
import { deleteMyFlight } from "../../api/myflights.js"; //Uçuş silme işlemi için API fonksiyonunu
import styles from "./flightItem.module.css";

const FlightItem = ({ flight, airlines, updateFlights }) => {
  // Uçuş yönünü kontrol ediyoruz (Kalkış veya varış)
  const isDeparture = flight.flightDirection === "D";
  const departureAirport = isDeparture ? "AMS" : flight.route.destinations[0];
  const arrivalAirport = isDeparture ? flight.route.destinations[0] : "AMS";

  // Saat dönüşümleri
  const {
    displayHour: departureHour,
    displayMinute: departureMinute,
    period: departurePeriod,
  } = formatScheduleTime(flight.scheduleTime);
  const adjustedTime = calculateAdjustedTime(flight.scheduleTime, isDeparture);
  const {
    displayHour: arrivalHour,
    displayMinute: arrivalMinute,
    period: arrivalPeriod,
  } = formatScheduleTime(adjustedTime.toTimeString().slice(0, 8));

  // Check-in zamanlarını formatlaması yaptım
  const checkinStartTime =
    flight.checkinAllocations?.checkinAllocations[0]?.startTime;
  const checkinEndTime =
    flight.checkinAllocations?.checkinAllocations[0]?.endTime;

  // Check-in startTime format
  const formattedStartTime = checkinStartTime
    ? formatScheduleTime(checkinStartTime.split("T")[1].slice(0, 8))
    : { displayHour: "N/A", displayMinute: "N/A", period: "" };

  // Check-in endTime format
  const formattedEndTime = checkinEndTime
    ? formatScheduleTime(checkinEndTime.split("T")[1].slice(0, 8))
    : { displayHour: "N/A", displayMinute: "N/A", period: "" };

  // lastUpdatedAt formatlama
  const { formattedDate, formattedTime } = formatDateTime(flight.lastUpdatedAt);

  // Uçuş db'den silme işlemi
  const handleDeleteFlight = async (_id) => {
    const result = await deleteMyFlight(_id); // flight.id'yi uygun şekilde güncelleyin
    if (result.success) {
      alert(result.message); // Başarılı olursa bir bildirim gösterin
      updateFlights(); // Uçuş listesini güncellemek için bir prop geçin
    } else {
      alert(result.message); // Hata mesajını gösterin
    }
  };

  return (
    <li className={styles.flightItemListContainer}>
      <div className={styles.listWrapper}>
        {/* Sol taraf: Uçuş saatleri ve havayolu bilgileri */}
        <div className={styles.flightHourandAirline}>
          <div className={styles.flighthours}>
            <div>
              {departureHour}:{departureMinute} {departurePeriod}
            </div>
            <div className={styles.horizontalline}></div>
            <div>
              {arrivalHour}:{arrivalMinute} {arrivalPeriod}
            </div>
          </div>
          <div className={styles.flightAirlineInfo}>
            <div>
              <div style={{ fontWeight: "600" }}>Airline</div>
              <div>{getAirlinePublicName(flight.prefixICAO, airlines)}</div>
            </div>
            <div>
              <div style={{ fontWeight: "600" }}>NonStop</div>
              <div>2h 25m</div>
              {/* Süreyi sabit olarak gösterdim cünnkü apiden bu bilgi gelmiyor */}
            </div>
            <div>
              <div style={{ fontWeight: "600" }}>
                {departureAirport} to {arrivalAirport}
              </div>
              <div>{flight.flightName}</div>
            </div>
          </div>
        </div>

        {/* Sağ taraf: Terminal ve check-in bilgileri */}
        <div className={styles.rightInfo}>
          <div>
            <div>Terminal</div>
            <div> {flight.terminal}</div>
          </div>
          <div>
            <div>Checkin startTime</div>
            <div>
              {formattedStartTime.displayHour}:
              {formattedStartTime.displayMinute} {formattedStartTime.period}
            </div>
          </div>
          <div>
            <div>Checkin endTime</div>
            <div>
              {formattedEndTime.displayHour}:{formattedEndTime.displayMinute}{" "}
              {formattedEndTime.period}
            </div>
          </div>
          <div>
            <div>last updatedAt info</div>
            <div>
              {formattedDate} {formattedTime}
            </div>
          </div>
        </div>
      </div>
      <button
        className={styles.deleteButton}
        onClick={() => handleDeleteFlight(flight._id)} // Butona tıklandığında uçuşu silen fonksiyon
      >
        Delete flight
      </button>
    </li>
  );
};

export default FlightItem;
