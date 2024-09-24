const axios = require("axios");

//ucus bilgilerini schiphol api'den cekiyor
const getFlights = async (req, res) => {
  const totalPages = 30; // kac sayfa cekmek istiyorum
  let flights = [];
  try {
    for (let page = 0; page < totalPages; page++) {
      const response = await axios.get(
        `https://api.schiphol.nl/public-flights/flights?includedelays=false&page=${page}&sort=%2BscheduleTime`,
        {
          headers: {
            Accept: "application/json",
            app_id: process.env.FLIGHT_API_ID,
            app_key: process.env.FLIGHT_API_KEY,
            ResourceVersion: "v4",
          },
        }
      );

      flights = flights.concat(response.data.flights);
    }

    //eger basarılıysa frontend'e d
    res.status(200).json(flights);
  } catch (error) {
    console.error("Ucus bilgileri alinirken hata: ", error);
    res.status(500).json({ message: "Ucus bilgileri alinamadi. " });
  }
};

module.exports = { getFlights };
