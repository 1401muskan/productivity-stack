import { Link } from "react-router-dom";

export default function Login() {
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
            fontWeight: "700",
          }}
        >
          Welcome Back
        </h1>

        <p
          style={{
            color: "#a1a1aa",
            marginBottom: "25px",
          }}
        >
          Login to your workspace
        </p>

        <input
          placeholder="Email"
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "12px",
            borderRadius: "10px",
            border: "1px solid #27272a",
            background: "#09090b",
            color: "white",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "20px",
            borderRadius: "10px",
            border: "1px solid #27272a",
            background: "#09090b",
            color: "white",
          }}
        />

        <button
          style={{
            width: "100%",
            padding: "12px",
            border: "none",
            borderRadius: "10px",
            background: "#7c3aed",
            color: "white",
            cursor: "pointer",
          }}
        >
          Login
        </button>

        <p
          style={{
            marginTop: "20px",
            color: "#a1a1aa",
          }}
        >
          Don't have an account?{" "}
          <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
}