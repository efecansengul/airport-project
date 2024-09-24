const express = require("express");
const Flight = require("../model/flight.model");

//Kullanıcının ucusunu kaydetme

const postMyFlights = async (req, res) => {
  try {
    const newFlight = new Flight(req.body); //gönderilerden yeni ucus olusturdum.
    await newFlight.save(); //mongoDB'ye kaydettim
    res.status(201).send({ message: "ucus basarili sekilde kaydedildi" });
  } catch (error) {
    if (error.code == "11000") {
      //2 kere kaydetme hatası
      return res.status(400).send({ message: "Bu ucus zaten kaydedilmiştir." });
    }
    console.error("Uçuş kaydetme hatası:", error);
    res.status(500).send({ message: "Uçuş kaydedilirken bir hata oluştu." });
  }
};

//kullancının ucusunu getirme
const getMyFlights = async (req, res) => {
  try {
    const flights = await Flight.find(); // Tüm uçuşları MongoDB'den çekiyoruz.
    res.status(200).json(flights); // Uçuşları JSON formatında geri döndürüyoruz.
  } catch (error) {
    console.error("Uçuşları getirirken hata:", error);
    res.status(500).send({ message: "Uçuşlar getirilirken bir hata oluştu." });
  }
};

//kullanıcının ucusunu id'ye göre silme
const deleteMyFlight = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFlight = await Flight.findByIdAndDelete(id);

    if (!deletedFlight) {
      return res.status(404).send({ message: "ucus bulunamadı." });
    }

    res.status(200).send({ message: "Ucus basarı ile silindi" });
  } catch (error) {
    console.error("Ucus silinirken hata: ", error);
    res.status(500).send({ message: "Ucus silinirken bir hata olustu. " });
  }
};

module.exports = { postMyFlights, getMyFlights, deleteMyFlight };
