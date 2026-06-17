import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../api/auth";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    try {
      setLoading(true);

      await registerUser(name, email, password);

      alert("Registration successful");

      navigate("/");
    } catch (error) {
      alert("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#09090b",
        padding: "24px",
      }}
    >
      <div
        style={{
          width: "420px",
          background: "#18181b",
          padding: "32px",
          borderRadius: "20px",
          border: "1px solid #27272a",
          boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
        }}
      >
        <h1
          style={{
            fontSize: "32px",
            fontWeight: "700",
            color: "white",
            marginBottom: "10px",
          }}
        >
          Create Account
        </h1>

        <p
          style={{
            color: "#a1a1aa",
            marginBottom: "24px",
          }}
        >
          Create your productivity workspace
        </p>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "12px",
            background: "#09090b",
            color: "white",
            border: "1px solid #27272a",
            borderRadius: "10px",
            boxSizing: "border-box",
          }}
        />

        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "12px",
            background: "#09090b",
            color: "white",
            border: "1px solid #27272a",
            borderRadius: "10px",
            boxSizing: "border-box",
          }}
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            background: "#09090b",
            color: "white",
            border: "1px solid #27272a",
            borderRadius: "10px",
            boxSizing: "border-box",
          }}
        />

        <button
          onClick={handleRegister}
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            background: "#7c3aed",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "600",
            fontSize: "15px",
          }}
        >
          {loading ? "Creating Account..." : "Create Account"}
        </button>

        <p
          style={{
            marginTop: "20px",
            color: "#a1a1aa",
            textAlign: "center",
          }}
        >
          Already have an account?{" "}
          <Link
            to="/"
            style={{
              color: "#a78bfa",
            }}
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
