export const getAirlinePublicName = (prefixICAO, airlines) => {
  if (!airlines || !prefixICAO) {
    return "Unknown Airline"; // Uygun bir varsayılan değer döndür
  }
  const airline = airlines.find((airline) => airline.icao === prefixICAO);
  return airline ? airline.publicName : "Unknown"; // Eğer eşleşme yoksa "Bilinmiyor" döner
};
