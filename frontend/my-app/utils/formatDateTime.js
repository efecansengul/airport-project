// Tarih ve saati formatlamak için bir fonksiyon
export const formatDateTime = (isoString) => {
  const date = new Date(isoString);

  // Tarihi formatla (yyyy-mm-dd formatı)
  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  // Saati formatla (hh:mm AM/PM formatı)
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // AM/PM formatı için
  });

  return { formattedDate, formattedTime };
};
