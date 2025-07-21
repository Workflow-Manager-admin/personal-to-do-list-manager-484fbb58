import React, { useState } from "react";

/**
 * PUBLIC_INTERFACE
 * User authentication form.
 * @param {object} props
 * @param {function} props.onAuthSuccess - Called with user object on success.
 */
function Auth({ onAuthSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Fake auth for local demo - Accept any non-empty username
  const authenticateUser = (e) => {
    e.preventDefault();
    if (username.trim() && password.trim()) {
      onAuthSuccess({ username, name: username });
      setError("");
    } else {
      setError("Please enter username and password.");
    }
  };

  return (
    <div className="auth-page">
      <form className="auth-form" onSubmit={authenticateUser}>
        <h1>Login</h1>
        <label>
          Username
          <input
            type="text"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            placeholder="Your username"
          />
        </label>
        <label>
          Password
          <input
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Your password"
          />
        </label>
        {error && <div className="error-msg">{error}</div>}
        <button className="btn-primary" type="submit">
          Login
        </button>
      </form>
      <style>{`
        .auth-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-primary, #fff);
        }
        .auth-form {
          width: 310px;
          background: var(--bg-secondary, #f8f9fa);
          padding: 2rem 2rem 1.6rem 2rem;
          border-radius: 12px;
          box-shadow: 0 2px 20px 0 rgba(44,55,130,0.08);
          display: flex;
          flex-direction: column;
          gap: 1.1rem;
        }
        .auth-form h1 {
          margin: 0 0 0.8rem 0;
          color: #1976d2;
        }
        .auth-form label {
          display: flex;
          flex-direction: column;
          color: var(--text-primary, #282c34);
          font-size: 1rem;
          margin-bottom: 6px;
        }
        .auth-form input {
          margin-top: 0.2rem;
          padding: 0.45rem 0.7rem;
          border: 1px solid var(--border-color,#e9ecef);
          font-size: 1rem;
          border-radius: 6px;
        }
        .btn-primary {
          background: #1976d2;
          color: #fff;
          border: none;
          border-radius: 6px;
          padding: 0.58rem 0.7rem;
          font-size: 1rem;
          font-weight: 600;
          margin-top: 0.6rem;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(25,118,210,0.10);
          transition: filter 0.2s;
        }
        .btn-primary:hover {
          filter: brightness(1.04);
        }
        .error-msg {
          color: #ff9800;
          font-size: 0.98rem;
          margin-top: -0.75rem;
          margin-bottom: 0.4rem;
          padding-left: 2px;
        }
      `}</style>
    </div>
  );
}

export default Auth;
