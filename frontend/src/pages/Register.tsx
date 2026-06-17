import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../api/auth";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleRegister = async () => {
    try {
      setLoading(true);

      await registerUser(
        name,
        email,
        password
      );

      alert(
        "Registration successful"
      );

      navigate("/");
    } catch (error) {
      alert(
        "Registration failed"
      );
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
      }}
    >
      <div
        style={{
          width: "420px",
          background: "#18181b",
          padding: "32px",
          borderRadius: "20px",
        }}
      >
        <h1>Create Account</h1>

        <input
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          placeholder="Name"
        />

        <input
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          placeholder="Email"
        />

        <input
          type="password"
          value={password}
          onChange={(e) =>
            setPassword(
              e.target.value
            )
          }
          placeholder="Password"
        />

        <button
          onClick={handleRegister}
          disabled={loading}
        >
          {loading
            ? "Registering..."
            : "Register"}
        </button>

        <p>
          Already have an account?
          <Link to="/">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}