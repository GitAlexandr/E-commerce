import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../Auth/AuthContext";
import Home from "./Home";
import Login from "../Auth/Login";
import './App.css'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ul id="navbar">
          <Link to="/"><li>Home</li></Link>
          <Link to="/login"><li>Login</li></Link>
        </ul>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;