import { useState, useRef, useEffect } from "react";

export function Step2Verify({ email, onNext, onBack }) {
  const [code, setCode] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [showCodePopup, setShowCodePopup] = useState(false);
  const countdownRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCodePopup(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (countdown > 0) {
      countdownRef.current = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    }

    return () => clearTimeout(countdownRef.current);
  }, [countdown]);

  const handleVerify = async () => {
    if (!code.trim()) {
      setError("Please enter the verification code");
      return;
    }

    setLoading(true);
    setError(null);

    const payload = {
      email: email,
      code: code.trim(),
    };

    try {
      const res = await fetch("http://localhost:8080/api/validate-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        const errorMsg = data.error || `Server error: ${res.status}`;
        setError(errorMsg);
        return;
      }

      onNext(data.user_id);
    } catch (e) {
      setError(e.message || "Error verifying code");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !loading && code.trim()) {
      handleVerify();
    }
  };

  const handleResendCode = async () => {
    if (countdown > 0) return;
    try {
      const payload = { email };

      const res = await fetch("http://localhost:8080/api/resend-email-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setError(null);
        setShowCodePopup(true);
        setCountdown(30);
      } else {
        setError(data.error || "Error resending code");
      }
    } catch (e) {
      setError("Error resending code");
    }
  };

  const handleUseCode = () => {
    setCode("123456");
    setShowCodePopup(false);
  };

  return (
    <div className="step-container">
      {showCodePopup && (
        <div
          className="code-popup-overlay"
          onClick={() => setShowCodePopup(false)}
        >
          <div className="code-popup" onClick={(e) => e.stopPropagation()}>
            <div className="code-popup-header">
              <h3>📧 New Email</h3>
              <button
                className="close-popup"
                onClick={() => setShowCodePopup(false)}
              >
                ✕
              </button>
            </div>
            <div className="code-popup-body">
              <p className="code-label">Your verification code:</p>
              <div className="code-display">123456</div>
              <button className="use-code-button" onClick={handleUseCode}>
                📋 Copy & Use Code
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="step-header">
        <h1>Verify Your Email</h1>
        <p className="step-subtitle">Code sent to</p>
        <p className="email-highlight">{email}</p>
      </div>

      <div className="input-group">
        <input
          type="text"
          value={code}
          onChange={(e) =>
            setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
          }
          onKeyPress={handleKeyPress}
          placeholder="Enter 6-digit code"
          className="input-field code-input"
          maxLength={6}
          disabled={loading}
        />
      </div>

      {error && <div className="error-message">{error}</div>}

      <button
        onClick={handleVerify}
        disabled={loading || !code.trim()}
        className="primary-button"
      >
        {loading ? "Verifying..." : "Verify Code"}
      </button>

      <div className="resend-container">
        <button
          className="link-button"
          disabled={countdown > 0}
          onClick={handleResendCode}
        >
          {countdown > 0 ? `Resend Code in ${countdown}s` : "Resend Code"}
        </button>
        <span className="separator">•</span>
        <button className="link-button" onClick={() => setShowCodePopup(true)}>
          View Code
        </button>
      </div>
    </div>
  );
}
