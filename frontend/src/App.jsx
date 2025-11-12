import { useState } from "react";
import { Step1Connect } from "./components/Step1Connect";
import { Step2Verify } from "./components/Step2Verify";
import { Step3Plan } from "./components/Step3Plan";
import { Step4Success } from "./components/Step4Success";
import "./index.css";

export default function App() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [userId, setUserId] = useState("");

  if (step === 4) {
    return (
      <>
        <Step4Success />
      </>
    );
  }

  if (step === 3) {
    return (
      <>
        <div style={{ position: "relative", minHeight: "100vh" }}>
          <button
            onClick={() => setStep(2)}
            className="back-button"
            aria-label="Back to verify email"
          >
            ←
          </button>
          <Step3Plan
            userId={userId}
            onNext={() => setStep(4)}
            onBack={() => setStep(2)}
          />
        </div>
      </>
    );
  }

  return (
    <>
      <div className="main-layout">
        {step === 2 && (
          <button onClick={() => setStep(1)} className="modify-email-button">
            ← Modify email
          </button>
        )}

        <div className="app-container">
          <div className="benefits-list">
            <div className="benefit-item">
              <div className="benefit-icon">🎮</div>
              <div className="benefit-content">
                <h3>Access to 100+ GAMES for FREE Thanks to ads</h3>
              </div>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon">📱</div>
              <div className="benefit-content">
                <h3>
                  Log in across all your devices seamless experience everywhere
                </h3>
              </div>
            </div>

            <div className="benefit-item">
              <div className="benefit-icon">⚡</div>
              <div className="benefit-content">
                <h3>
                  Skip the line with customer support priority assistance when
                  you need it
                </h3>
              </div>
            </div>
          </div>

          <div className="form-section">
            {step === 1 && (
              <Step1Connect
                onNext={(email) => {
                  setEmail(email);
                  setStep(2);
                }}
              />
            )}
            {step === 2 && (
              <Step2Verify
                email={email}
                onNext={(userId) => {
                  setUserId(userId);
                  setStep(3);
                }}
                onBack={() => setStep(1)}
              />
            )}
          </div>

          <div className="footer-terms">
            By continuing, you agree to our{" "}
            <a href="/terms">Terms of Service</a> and{" "}
            <a href="/privacy">Privacy Policy</a>.
          </div>
        </div>
      </div>
    </>
  );
}
