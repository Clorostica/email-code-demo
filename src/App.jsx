import React, { useState } from 'react';
import Step1Connect from './components/Step1Connect';
import Step2Verify from './components/Step2Verify';
import Step3ChoosePlan from './components/Step3Plan';
import Step4Congrats from './components/Step4Success';
import './index.css';

function App() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState(null);

  const goToStep2 = (emailFromStep1) => {
    setEmail(emailFromStep1);
    setStep(2);
  };

  const goToStep3 = (id) => {
    setUserId(id);
    setStep(3);
  };

  const goToStep4 = () => {
    setStep(4);
  };

  const goToStep1 = () => {
    setStep(1);
    setUserId(null);
    setEmail('');
  };

  const goBackToStep2 = () => {
    setStep(2);
    setUserId(null);
  };

  if (step === 4) {
    return <Step4Congrats />;
  }

  if (step === 3) {
    return (
      <div style={{ padding: '40px 20px', position: 'relative', minHeight: '100vh' }}>
        <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 999 }}>
          <a 
            onClick={goBackToStep2}
            className="modify-email-button"
            aria-label="Back to verify email">
             ←
          </a>

        </div>
        <Step3ChoosePlan userId={userId} onNext={goToStep4} />
      </div>
    );
  }

  return (
    <div className="main-layout" style={{ position: 'relative', minHeight: '100vh' }}>
      {step === 2 && (
        <div style={{ position: 'fixed', top: 20, left: 20, zIndex: 1000 }}>
          <a 
            onClick={goToStep1} 
            className="modify-email-button">
              ← Modify email
          </a>
        </div>
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
              <h3>Log in across all your devices seamless experience everywhere</h3>
            </div>
          </div>

          <div className="benefit-item">
            <div className="benefit-icon">⚡</div>
            <div className="benefit-content">
              <h3>Skip the line with customer support priority assistance when you need it</h3>
            </div>
          </div>
        </div>

        <div className="form-section">
          {step === 1 && <Step1Connect onNext={goToStep2} />}
          {step === 2 && <Step2Verify email={email} onNext={goToStep3} />}
        </div>

        <div className="footer-terms" style={{ marginTop: '40px' }}>
          By continuing, you agree to our <a href="/terms">Terms of Service</a> and{' '}
          <a href="/privacy">Privacy Policy</a>.
        </div>
      </div>
    </div>
  );
}

export default App;
