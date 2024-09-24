import { useNavigate } from "react-router-dom";
export default function ErrorPage() {
  const navigate = useNavigate();
  function navigateHandler() {
    //anasayfaya yönlendirme işlevi
    navigate("/");
  }
  return (
    <>
      <main>
        <h1>An error occured!</h1>
        <p>Could not found this page!</p>
        <p>
          <button onClick={navigateHandler}>Goto homepage</button>
        </p>
      </main>
    </>
  );
}
