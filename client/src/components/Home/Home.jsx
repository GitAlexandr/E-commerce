import { useContext } from "react";
import { AuthContext } from "../Auth/AuthContext";

function Home() {
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    <div>
      <h1 className="home__lable">Home</h1>
      {isLoggedIn ? (
        <>
          <p>Добро пожаловать в e-commerce shop.</p>
          {/* <p className="main-text">Целью нашего проекта является предоставление MVP рабочего проекта продажи продуктов с возможностью его масштабирования.</p> */}
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <h2>Войдите в аккаунт, чтобы использовать все возможности!</h2>
      )}
    </div>
  );
}

export default Home;