export async function fetchFlights() {
  //apiden tüm ucus verilerini almak icin fetch cagrısı
  try {
    const response = await fetch("http://localhost:5000/api/flights"); // Sunucu API'si URL
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    return await response.json();
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error;
  }
}
