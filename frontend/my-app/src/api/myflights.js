//backend'e post istegi atıyorum
export async function postMyFlights(flightData) {
  try {
    const response = await fetch("http://localhost:5000/api/myflights", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(flightData),
    });
    if (!response.ok) {
      const errorResult = await response.json();
      console.log(errorResult.message);
      return { success: false, message: errorResult.message || "Hata olustu" };
    }
    const result = await response.json();
    console.log(result.message); //ucus bari ile kaydedildi.
    return { success: true, message: result.message };
  } catch (error) {
    console.log("Ucus kaydedilirken hata: ", error);
    return { success: false, message: "Hata oluştu" };
  }
}

//kullanıcının sectigi ucakları döndüren get istegi

export async function getMyFlights() {
  try {
    const response = await fetch("http://localhost:5000/api/myflights", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorResult = await response.json();
      console.log(errorResult.message);
      return { success: false, message: errorResult.message || "Hata oluştu" };
    }

    const result = await response.json();
    return { success: true, flights: result }; // Gelen uçuşları döndür
  } catch (error) {
    console.log("Uçuşları alırken hata: ", error);
    return { success: false, message: "Hata oluştu" };
  }
}

//kullanıcının sectigi ucusu silen delete istegi
export async function deleteMyFlight(id) {
  try {
    const response = await fetch(`http://localhost:5000/api/myflights/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const errorResult = await response.json();
      console.log(errorResult.message);
      return { success: false, message: errorResult.message || "Hata olustu" };
    }
    const result = await response.json();
    console.log(result.message);
    return { success: true, message: result.message };
  } catch (error) {
    console.log("Ucus silinirken hata: ", error);
    return { success: false, message: "Hata olustu" };
  }
}
