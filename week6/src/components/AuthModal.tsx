
import { useState } from "react";

type AuthModalProps = {
  mode: "login" | "signup";
  onClose: () => void;
  onSuccess: (email: string) => void;
  onSwitchMode: (mode: "login" | "signup") => void;
};

type DemoUser = {
  name: string;
  email: string;
  password: string;
};

const USERS_KEY = "movie-explorer-demo-users";

function AuthModal({
  mode,
  onClose,
  onSuccess,
  onSwitchMode,
}: AuthModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail || !password) {
      setError("Please fill in your email and password.");
      return;
    }

    if (mode === "signup") {
      if (!name.trim()) {
        setError("Please enter your name.");
        return;
      }

      if (password.length < 6) {
        setError("Password must be at least 6 characters.");
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
    }

    let users: DemoUser[] = [];

    try {
      users = JSON.parse(localStorage.getItem(USERS_KEY) || "[]") as DemoUser[];
    } catch {
      setError("Unable to read demo accounts from this browser.");
      return;
    }

    if (mode === "signup") {
      if (users.some((user) => user.email === normalizedEmail)) {
        setError("An account with this email already exists. Please log in.");
        return;
      }

      const newUser: DemoUser = {
        name: name.trim(),
        email: normalizedEmail,
        password,
      };

      try {
        localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));
        onSuccess(newUser.email);
      } catch {
        setError("Unable to save your demo account in this browser.");
      }

      return;
    }

    const existingUser = users.find(
      (user) =>
        user.email === normalizedEmail && user.password === password
    );

    if (!existingUser) {
      setError("Incorrect email or password.");
      return;
    }

    onSuccess(existingUser.email);
  };

  return (
    <div className="auth-overlay" onClick={onClose}>
      <section
        className="auth-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="auth-close"
          type="button"
          onClick={onClose}
          aria-label="Close authentication"
        >
          ×
        </button>

        <p className="eyebrow">MOVIE EXPLORER ACCOUNT</p>
        <h2 id="auth-title">{mode === "signup" ? "Create your account" : "Welcome back"}</h2>
        <p className="auth-description">
          {mode === "signup"
            ? "Save movies and build your personal watchlist."
            : "Log in to continue exploring your movies."}
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          {mode === "signup" && (
            <label>
              Your name
              <input
                type="text"
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </label>
          )}

          <label>
            Email address
            <input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <label>
            Password
            <input
              type="password"
              autoComplete={mode === "signup" ? "new-password" : "current-password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              minLength={mode === "signup" ? 6 : undefined}
              required
            />
          </label>

          {mode === "signup" && (
            <label>
              Confirm password
              <input
                type="password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
              />
            </label>
          )}

          {error && <p className="auth-error" role="alert">{error}</p>}

          <button className="auth-submit" type="submit">
            {mode === "signup" ? "Create account" : "Log in"}
          </button>
        </form>

        <p className="auth-switch">
          {mode === "signup" ? "Already have an account?" : "New to Movie Explorer?"}{" "}
          <button
            type="button"
            onClick={() => onSwitchMode(mode === "signup" ? "login" : "signup")}
          >
            {mode === "signup" ? "Log in" : "Sign up"}
          </button>
        </p>

        <p className="auth-demo-note">
          Demo account only. Do not use a real password.
        </p>
      </section>
    </div>
  );
}

export default AuthModal;