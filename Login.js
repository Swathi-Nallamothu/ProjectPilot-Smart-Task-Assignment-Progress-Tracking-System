import { useState } from "react";
import { API } from "../api";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Basic validation
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const res = await fetch(API.login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      // ❌ If login fails
      if (!res.ok) {
        alert(data.msg || "Login failed. Please signup first.");
        return;
      }

      // ✅ Success
      localStorage.setItem("token", data.token);

      alert("Login successful!");
      navigate("/dashboard");

    } catch (err) {
      console.error("Login error:", err);
      alert("Cannot connect to server. Make sure backend is running.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Login</h2>

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>

      <p style={{ marginTop: "10px" }}>
        Don't have an account?{" "}
        <span
          style={{ color: "blue", cursor: "pointer" }}
          onClick={() => navigate("/signup")}
        >
          Signup here
        </span>
      </p>
    </div>
  );
}

export default Login;