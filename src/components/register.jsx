import { useState } from "react";
import { useNavigate, useOutlet, useOutletContext } from "react-router-dom";
import { BASE_URL } from "../api/util";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");

  const { setToken } = useOutletContext();
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    console.log(username, password, confirmation);

    if (password !== confirmation) {
      setError("Password Incorrect");
    }

    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const result = await response.json();
    console.log(result);
    if (result.error) {
      setError(result.message);
      return;
    }

    setToken(result.token);
    localStorage.setItem("token", result.token);
    navigate("/");
  }
  return (
    <div>
      <form onSubmit={handleRegister}>
        <input
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          placeholder="username"
          type="username"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="password"
          type="password"
        />
        <input
          onChange={(e) => setConfirmation(e.target.value)}
          value={confirmation}
          placeholder="confirm password"
          type="confirmation"
        />
        <button>Register</button>
        <p> {error} </p>
      </form>
    </div>
  );
}
