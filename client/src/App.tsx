import React, { useState } from "react";
import "./App.css";

const API_BASE_URL = "http://localhost:5000";

type AuthMode = "login" | "register";

const App: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>("register");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const isRegister = mode === "register";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const endpoint = isRegister ? "/api/auth/register" : "/api/auth/login";
      const body: any = { email, password };
      if (isRegister) {
        body.name = name;
        body.gender = gender;
        body.age = Number(age);
      }

      const res = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setToken(data.token || null);
      setMessage(isRegister ? "Registered successfully!" : "Logged in successfully!");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setMessage(err.message);
      } else {
        setMessage("Request failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-root">
      <div className="auth-card">
        <h1 className="app-title">Dating App</h1>
        <div className="mode-toggle">
          <button
            onClick={() => setMode("login")}
            className={mode === "login" ? "mode-btn active" : "mode-btn"}
          >
            Login
          </button>
          <button
            onClick={() => setMode("register")}
            className={mode === "register" ? "mode-btn active" : "mode-btn"}
          >
            Register
          </button>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          {isRegister && (
            <>
              <label>
                Name
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>

              <label>
                Gender
                <input
                  type="text"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                />
              </label>

              <label>
                Age
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  required
                  min={18}
                />
              </label>
            </>
          )}

          <button type="submit" className="primary-btn" disabled={loading}>
            {loading ? "Please wait..." : isRegister ? "Create account" : "Login"}
          </button>
        </form>

        {message && <p className="status-message">{message}</p>}

        {token && (
          <div className="token-box">
            <strong>JWT token (for testing):</strong>
            <code>{token}</code>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
