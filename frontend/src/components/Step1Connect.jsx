import React, { useState } from "react";

export function Step1Connect({ onNext }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email.trim() || !email.includes("@")) {
      setError("Please enter a valid email address");
      return;
    }

    const API_URL = import.meta.env.VITE_API;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `${API_URL}/api/send-email-validation-code?email=${encodeURIComponent(
          email
        )}`
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to send email");
      }

      onNext(email.trim());
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading && email.trim()) {
      handleSubmit();
    }
  };

  return (
    <div className="step-container">
      <div className="step-header">
        <h1>Connect with Email</h1>
        <p className="step-subtitle">...and unlock the benefits!</p>
      </div>

      <div className="input-group">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="your@email.com"
          className="input-field"
          disabled={loading}
        />
      </div>

      {error && <div className="error-message">{error}</div>}

      <button
        onClick={handleSubmit}
        disabled={loading || !email.trim()}
        className="primary-button"
      >
        {loading ? "Sending..." : "Send Verification Code"}
      </button>

      <div className="info-box">
        <span className="info-icon">💡</span>
        <p>We'll send you a 6-digit verification code to verify your email</p>
      </div>
    </div>
  );
}
