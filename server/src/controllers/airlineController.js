const axios = require("axios");

//ucus bilgilerini schiphol api'den cekiyor
const getAirlines = async (req, res) => {
  const totalPages = 50; // kac sayfa cekmek istiyorum
  let airlines = [];
  try {
    for (let page = 0; page < totalPages; page++) {
      const response = await axios.get(
        `https://api.schiphol.nl/public-flights/airlines?page=${page}&sort=%2Biata`,
        {
          headers: {
            Accept: "application/json",
            app_id: process.env.FLIGHT_API_ID,
            app_key: process.env.FLIGHT_API_KEY,
            ResourceVersion: "v4",
          },
        }
      );

      airlines = airlines.concat(response.data.airlines);
    }

    //eger basarılıysa frontend'e d
    res.status(200).json(airlines);
  } catch (error) {
    console.error("Airlines bilgileri alirken hata olustu: ", error);
    res.status(500).json({ message: "Airlines bilgileri alinamadi. " });
  }
};

module.exports = { getAirlines };
