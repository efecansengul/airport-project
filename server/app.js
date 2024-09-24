const express = require("express");
const app = express();
require("dotenv").config();
require("./src/db/dbConnection");
const cors = require("cors");

const flightRoutes = require("./src/routers/flightRoutes"); // Uçuş rotasını import ettim.
const airlineRoutes = require("./src/routers/airlineRoutes"); //Airlines rotasını import ettim.
const myflightsRoutes = require("./src/routers/myflightRoutes"); //myflights rotasını import ettim.
const port = process.env.PORT || 5001;

//middleware Json verileriyle calısmak icin body-parser kullanımı
app.use(express.json());
app.use(cors()); //frontend ve backend farklı portlarda calıstıgı icin CORS yapılandırdım.

//rotalar
app.use("/api", flightRoutes); // ucus rotasını "/api" ile baslat
//örnek kulllanım (.../api/flights) end pointine istek apiden ucus bilgilerini cekeceksin;
app.use("/api", airlineRoutes); // (../api/airlines) endpoint

app.use("/api", myflightsRoutes); // (../api/myflights) endpoint

app.listen(port, () => {
  console.log(`Server ${port} portundan calisiyor...`);
});
