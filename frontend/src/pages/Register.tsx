import { Link } from "react-router-dom";

export default function Register() {
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
          Create Account
        </h1>

        <input
          placeholder="Name"
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
          }}
        >
          Register
        </button>

        <p
          style={{
            marginTop: "20px",
            color: "#a1a1aa",
          }}
        >
          Already have an account?{" "}
          <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}