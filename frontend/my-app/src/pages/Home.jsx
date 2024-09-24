import { useState, useEffect } from "react";
import BookFlight from "../components/bookFlight/bookFlight"; //ucus rezarvasyon bileseini ice aktardım
import Header from "../components/header/Header";
import ShowFlights from "../components/showFlights/showFlights"; //ucusları gösterdigim bileseni ice aktardım
import ShowResources from "../components/showResources/ShowResources"; //kaynakları gösterdigim bileseni ice aktardım
import SortBy from "../components/sortBy/sortBy"; //sıralama islemini iceren bilesen

import styles from "./Home.module.css";
import { fetchAirlines } from "../api/airlines"; //Havayolu verilerini almak için API işlevini ice aktardım
export default function HomePage() {
  const [flights, setFlights] = useState([]); // kullanıcı girdisine göre filtrelenmiş ucuslar
  const [airlines, setAirlines] = useState([]); // Alınan havayolu verilerini tutmak için state
  const [selectedAirlines, setSelectedAirlines] = useState([]); // Seçilen havayollarını tutmak için state
  const [hasFetchedAirlines, setHasFetchedAirlines] = useState(false); // Havayolu verilerinin tekrar bu sayfa render edildiginde alınıp alınmadıgını tutmak icin state
  const [loading, setLoading] = useState(true); //yükeleme durumu
  const [error, setError] = useState(null); //hata durumu
  const [clickBookButton, setClickBookButton] = useState(false); // kullanıcının havalanlarını secip tarih girip girmedigini tutan state

  //kontrol
  //  console.log("Current flights:", flights);

  useEffect(() => {
    if (!hasFetchedAirlines) {
      // Eğer daha önce veri alınmadıysa
      const getAirlinesData = async () => {
        try {
          const data = await fetchAirlines(); //havayolu verilerini aldıgım fonksiyon (src/api/airlines.js)
          //console.log(data);
          setAirlines(data); //havayolu verilerini state'e kaydet
          setHasFetchedAirlines(true); // Veri alındıktan sonra bunu true yap
        } catch (error) {
          console.error("Error fetching airlines:", error);
        }
      };
      getAirlinesData();
    }
  }, [hasFetchedAirlines]);
  return (
    <>
      <Header />
      <section className={styles.layout}>
        <div className={styles.item1}>
          <BookFlight
            setFlights={setFlights} // Uçuşları ayarlamak için setFlights işlevini
            setError={setError} //hata durumunu ayarlamak icin
            setLoading={setLoading} //yükleme state'i ayarlamak icin işlevi geçirdim
            setClickBookButton={setClickBookButton} // arama butonuna tıklama durumunu ayarlamak icin işlevi gecirdim
          />
        </div>
        <div className={styles.item2}>
          <ShowFlights
            flights={flights} //ucusları gecirdim
            airlines={airlines} //havayolu verilerini gecirdim
            setSelectedAirlines={setSelectedAirlines} //ucusları ayarlamak icin işlevi gecirdim
            loading={loading} //yükleme durumu
            error={error} //error durumu
            clickBookButton={clickBookButton} //arama durumunu baslattı mı baslatmadımı durumu
          />
        </div>
        <div className={styles.item3}>
          <SortBy
            flights={flights} //ucusları gecirdim
            setFlights={setFlights} //ucusları ayarlama fonk. gecirdim
            selectedAirlines={selectedAirlines} // secilen havayollarını geciriyorum
          />
        </div>
        <div className={styles.item4}>
          <ShowResources />
          {/* Aside gösteren bileşeni render */}
        </div>
      </section>
    </>
  );
}
