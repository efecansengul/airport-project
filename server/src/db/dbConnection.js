const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    console.log("veri tabanına basari bir sekilde baglanıldı");
  })
  .catch((err) => {
    console.log("Veri tabanına bağlanırken hata cıktı: ", err);
  });
