export async function fetchAirlines() {
  try {
    // API'den havayolu verilerini almak için fetch çağrısı yapıyoruz
    const response = await fetch("http://localhost:5000/api/airlines"); // Sunucu API'si URL
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    // Yanıtı JSON formatında döndürüyoruz
    return await response.json();
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    throw error; // Hata fırlatıyoruz, böylece çağıran fonksiyon bu hatayı yakalayabilir
  }
}
