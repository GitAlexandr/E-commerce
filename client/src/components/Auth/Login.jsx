import { useContext, useState } from "react";
import { AuthContext } from "./AuthContext";
import './index.css'

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Fake network request for JWT token
    const jwtToken = "fake-jwt-token";
    login(jwtToken);
  };

  return (
    <div className="text-field">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label className="login__label" htmlFor="email">Email:</label>
        <input
          className="login__input"
          placeholder="Login..."
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label className="password__label" htmlFor="password">Password:</label>
        <input
          className="password__input"
          placeholder="Password..."
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;