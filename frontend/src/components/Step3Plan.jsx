import { useState, useEffect } from "react";

export function Step3Plan({ userId, onNext, onBack }) {
  const [products, setProducts] = useState(null);
  const [plan, setPlan] = useState("year");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/api/get-products")
      .then((res) => {
        if (!res.ok) throw new Error("Error loading plans");
        return res.json();
      })
      .then(setProducts)
      .catch(() => setError("Error loading plans"));
  }, []);

  const handleStartTrial = async () => {
    if (!plan) return setError("Please select a plan");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("http://localhost:8080/api/start-trial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          plan: plan,
        }),
      });

      if (!res.ok) throw new Error("Error starting trial");
      onNext();
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  if (!products)
    return (
      <div className="loading-container">
        <p>Loading plans...</p>
      </div>
    );

  return (
    <div className="plan-step">
      <h1 className="plan-title">Choose Your Plan</h1>

      <div className="plans-container">
        <div
          className={`plan-card ${plan === "year" ? "selected" : ""}`}
          onClick={() => setPlan("year")}
        >
          <div className="save-badge">Save 20%</div>

          <div className={`radio-button ${plan === "year" ? "checked" : ""}`}>
            {plan === "year" && <div className="radio-dot"></div>}
          </div>

          <h2 className="plan-name">Annual Plan</h2>
          <div className="plan-price">
            ${products.year.price}
            <span>/year</span>
          </div>
          <p className="plan-billing">Billed annually</p>
          <div className="trial-badge">
            {products.year.trial_days}-day free trial
          </div>
        </div>

        <div
          className={`plan-card ${plan === "monthly" ? "selected" : ""}`}
          onClick={() => setPlan("monthly")}
        >
          <div
            className={`radio-button ${plan === "monthly" ? "checked" : ""}`}
          >
            {plan === "monthly" && <div className="radio-dot"></div>}
          </div>

          <h2 className="plan-name">Monthly Plan</h2>
          <div className="plan-price">
            ${products.monthly.price}
            <span>/month</span>
          </div>
          <p className="plan-billing">Billed monthly</p>
          <div className="trial-badge">
            {products.monthly.trial_days}-day free trial
          </div>
        </div>
      </div>

      <p className="cancel-note">Cancel anytime.</p>

      <button
        onClick={handleStartTrial}
        disabled={loading}
        className="primary-button trial-button"
      >
        {loading ? "Loading..." : "Start Free Trial"}
      </button>

      {error && <div className="error-message">{error}</div>}

      <div className="footer-links">
        <a href="/privacy">Privacy Policy</a>
        <span>•</span>
        <a href="/terms">Terms of Service</a>
        <span>•</span>
        <a href="/restore">Restore Purchase</a>
      </div>
    </div>
  );
}
