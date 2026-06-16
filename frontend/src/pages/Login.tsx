import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../api/auth";

import {
  useAuthStore,
} from "../store/authStore";

export default function Login() {
  const navigate = useNavigate();

  const setToken =
    useAuthStore(
      (state) => state.setToken
    );

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);

      const response =
        await loginUser(
          email,
          password
        );

      setToken(
        response.data.token
      );

      navigate("/dashboard");
    } catch (error) {
      alert(
        "Invalid credentials"
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
        <h1
          style={{
            fontSize: "32px",
            marginBottom: "10px",
          }}
        >
          Welcome Back
        </h1>

        <p
          style={{
            color: "#a1a1aa",
            marginBottom: "20px",
          }}
        >
          Login to your workspace
        </p>

        <input
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
          placeholder="Email"
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "12px",
          }}
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
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
          }}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            background: "#7c3aed",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          {loading
            ? "Logging in..."
            : "Login"}
        </button>

        <p
          style={{
            marginTop: "20px",
          }}
        >
          Don't have an account?{" "}
          <Link to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}