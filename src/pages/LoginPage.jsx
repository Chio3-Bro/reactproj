import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useNotifications } from "../hooks/useNotifications";

function LoginPage() {
  const [email, setEmail] = useState("user@example.com");
  const [password, setPassword] = useState("user123");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login } = useAuth();
  const { showNotification } = useNotifications();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await login({ email, password });
      showNotification("Login successful", "success");
      navigate("/bookings");
    } catch (error) {
      showNotification(
        error?.response?.data?.message || "Login failed",
        "error",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="login-page">
      <div className="login-card">
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <label>
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default LoginPage;
