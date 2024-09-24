import { useEffect, useState, useRef } from "react";
import { format } from "date-fns"; // Tarih formatı için date-fns kütüphanesi
import DepartureSelect from "./departureSelect.jsx";
import DestinationSelect from "./destinationSelect.jsx";
import DateSelect from "./selectedDate.jsx";
import ToggleButton from "./toggleButton.jsx";
import plane from "../../assets/image/black-plane.png";
import styles from "./bookFlight.module.css";
import { fetchFlights } from "../../api/flight";

/**
 * BookFlight bileşeni, uçuş rezervasyonunu yapma arayüzünü sağlar.
 * Kullanıcı, kalkış ve varış havaalanlarını seçebilir ve tarihleri belirleyebilir.
 */

export default function BookFlight({
  setFlights,
  setError,
  setLoading,
  setClickBookButton,
}) {
  const [airports, setAirports] = useState([]); //tüm havaalanları

  const [routeDestinations, setRouteDestinations] = useState([]); //varış noktarı
  const [selectedDeparture, setSelectedDeparture] = useState(""); //secilen kalkıs noktalrı
  const [selectedDestination, setSelectedDestination] = useState(""); //secilen varıs havaalanı

  const [filteredAirports, setFilteredAirports] = useState([]); // Filtrelenmiş havaalanları

  const [activeButton, setActiveButton] = useState(true); //aktif buttonun kimligi
  const [searchTerm, setSearchTerm] = useState(""); // input alanına yazılan arama terimi

  // useRef ile tarih referanslarını oluştur
  const dateRef1 = useRef(null);
  const dateRef2 = useRef(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  //hava alanlarını almak icin api cagrısı
  useEffect(() => {
    async function fetchAirports() {
      setLoading(true); // Yüklenme durumunu başlat
      setError(null); // Önceki hatayı sıfırla
      try {
        const data = await fetchFlights();
        console.log(data);
        const flights = data || []; //ucus verileri
        const destinations = flights.flatMap(
          //tüm varış noktarını apiden al
          (flight) => flight.route.destinations
        );
        const uniqueDestinations = [...new Set(destinations)]; //tekil varıs noktalarını filtrele
        setAirports(["AMS", ...uniqueDestinations]); //havaalanlarını ayarla
        setRouteDestinations(uniqueDestinations); //varıs havaalanını ayarla
      } catch (error) {
        setError(
          "Havaalanları alınırken bir hata oluştu.Muhtemelen cok fazla istek attınız api istek kısıtlaması"
        );
      } finally {
        setLoading(false); //yükleme durumunu sonlandır
      }
    }
    fetchAirports(); //api cagrısını baslat
  }, []);

  // Kalkış havaalanına göre varış havaalanını ayarla
  useEffect(() => {
    if (selectedDeparture === "AMS") {
      setSelectedDestination(""); // Eğer kalkış Schiphol ise varış boş olsun
    } else {
      // Aksi takdirde varış Schiphol olsun
      setSelectedDestination("AMS");
    }
  }, [selectedDeparture]);

  // Arama terimine göre havaalanlarını filtrele
  useEffect(() => {
    const results = airports.filter((airport) =>
      airport.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredAirports(results); //filtrelenmiş havaalanlarını ayarla
  }, [searchTerm, airports]);
  const handleToggle = () => {
    setActiveButton((prev) => !prev);
  };

  //form gönderimi
  const handleSubmit = async (e) => {
    e.preventDefault();
    setClickBookButton(true); //butona tıklandıgında belirt
    try {
      const data = await fetchFlights(); //ucus verilerini al
      const formattedStartDate = format(startDate, "yyyy-MM-dd"); // Başlangıç tarihini formatla
      const formattedEndDate = endDate ? format(endDate, "yyyy-MM-dd") : null; // Bitiş tarihini formatla

      let filteredFlights = []; //filtrelenmiş ucuslar

      //one-way durumu kontrolü
      if (!activeButton) {
        filteredFlights = data.filter((flight) => {
          return (
            (selectedDeparture === "AMS" &&
              flight.flightDirection === "D" &&
              flight.scheduleDate === formattedStartDate &&
              flight.route.destinations.includes(selectedDestination)) ||
            (selectedDestination === "AMS" &&
              flight.flightDirection === "A" &&
              flight.scheduleDate === formattedStartDate &&
              flight.route.destinations.includes(selectedDeparture))
          );
        });
      } else {
        // Round Trip durumu
        const outgoingFlights = data.filter((flight) => {
          return (
            selectedDeparture === "AMS" &&
            flight.flightDirection === "D" &&
            flight.scheduleDate === formattedStartDate &&
            flight.route.destinations.includes(selectedDestination)
          );
        });

        const returnFlights = data.filter((flight) => {
          return (
            flight.flightDirection === "A" &&
            flight.scheduleDate === formattedEndDate &&
            flight.route.destinations.includes(selectedDestination)
          );
        });

        filteredFlights = [...outgoingFlights, ...returnFlights];

        if (selectedDestination === "AMS") {
          const incomingFlights = data.filter((flight) => {
            return (
              flight.flightDirection === "A" &&
              flight.scheduleDate === formattedStartDate &&
              flight.route.destinations.includes(selectedDeparture)
            );
          });

          const departingFlights = data.filter((flight) => {
            return (
              flight.flightDirection === "D" &&
              flight.scheduleDate === formattedEndDate &&
              flight.route.destinations.includes(selectedDeparture)
            );
          });

          filteredFlights = [...incomingFlights, ...departingFlights];
        }
      }

      setFlights(filteredFlights); //filrelenmiş ucusları ayarladım
      setClickBookButton(false); //buton durumunu sıfırladım
      console.log("Filtered flights:", filteredFlights); // Kontrol için
    } catch (error) {
      console.error("Uçuş verileri alınamadı: ", error);
    }
  };
  return (
    <section className={styles.content1}>
      <nav className={styles.nav}>
        <div className={styles.booking}>
          <img src={plane} alt="plane pic" />
          <h1>Book Your Flight</h1>
        </div>
        <div className={styles.buttonContainer}>
          <ToggleButton
            isActive={activeButton}
            onClick={handleToggle}
            label="Round Trip"
            whichButton="leftButton"
          />
          <ToggleButton
            isActive={!activeButton}
            onClick={handleToggle}
            label="One Way"
            whichButton="rightButton"
          />
        </div>
      </nav>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formContainer}>
          <div className={styles.flyInput}>
            <DepartureSelect
              selectedDeparture={selectedDeparture}
              setSelectedDeparture={setSelectedDeparture} //kalkış durumunu ayarlamak icin fonksiyon
              airports={filteredAirports}
              setSearchTerm={setSearchTerm} // Arama terimini set etmek için
            />

            <DestinationSelect
              selectedDeparture={selectedDeparture}
              selectedDestination={selectedDestination}
              setSelectedDestination={setSelectedDestination}
              routeDestinations={routeDestinations}
              setSearchTerm={setSearchTerm}
            />
          </div>
          <div className={styles.dateInput}>
            <DateSelect
              ref={dateRef1}
              selectedDate={startDate}
              onChange={(date) => setStartDate(date)}
              className={styles.roundedLeft}
            />
            {activeButton && (
              <DateSelect
                ref={dateRef2}
                selectedDate={endDate}
                onChange={(date) => setEndDate(date)}
                className={styles.roundedRight}
              />
            )}
          </div>
        </div>
        <button className={styles.submitButton} type="submit">
          Show flights
        </button>
      </form>
    </section>
  );
}
