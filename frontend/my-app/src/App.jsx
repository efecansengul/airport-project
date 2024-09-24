import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/Home";
import MyFlightsPage, { getFlightsLoader } from "./pages/MyFlights";
import ErrorPage from "./pages/Error";
const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />, //hata bileseni
    children: [
      {
        path: "/", //anasayfa yolu
        element: <HomePage />, //anasayfa bileseni
      },
      {
        path: "myflights", //kullanıcının sectigi ucusların yolu
        element: <MyFlightsPage />, //ucuslar bileseni
        loader: getFlightsLoader, //ucus verilerini db yüklemek icin kullanılan yükleyici
      },
    ],
  },
]);

function App() {
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
