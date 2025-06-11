import React from 'react';

function Step3Plan({ userId, onNext }) {
  const [products, setProducts] = React.useState(null);
  const [plan, setPlan] = React.useState('year'); 
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [clicked, setClicked] = React.useState(false);

  React.useEffect(() => {
    fetch('http://localhost:8080/api/get-products')
      .then(res => {
        if (!res.ok) throw new Error('Error loading plans');
        return res.json();
      })
      .then(setProducts)
      .catch(() => setError('Error loading plans'));
  }, []);

  const handleStartTrial = async () => {
    if (!plan) return setError('Please select a plan');
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('http://localhost:8080/api/start-trial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          plan: plan
        }),
      });

      if (!res.ok) throw new Error('Error starting trial');
      onNext();
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  if (!products) return <p>Loading plans...</p>;

  const priceBoxStyle = {
    color: 'white',
    borderRadius: '10px',
    padding: '8px 16px',
    fontSize: '1.5rem',
    fontWeight: 'bold',
  };

  const detailStyle = {
    backgroundColor: '#312e81',
    padding: '6px 12px',
    fontSize: '0.95rem',
    width: '100%',
    textAlign: 'center',
    color: '#facc15',
    fontWeight: 'bold',
    marginBottom: '20px',
    borderRadius: '8px',
    boxSizing: 'border-box',
  };

  const radioStyle = (selected) => ({
    height: '20px',
    width: '20px',
    borderRadius: '50%',
    border: selected ? '6px solid #facc15' : '2px solid #a78bfa',
    backgroundColor: selected ? '#facc15' : 'transparent',
    transition: 'all 0.3s ease',
    boxShadow: selected ? '0 0 6px #facc15' : 'none',
  });

  return (
    <div className="page-wrapper">
      <div className="centered-container">
        <h1 className="subtitle">Choose your plan</h1>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: '40px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '55px',
            position: 'relative',
          }}
        >

          <label
            onClick={() => setPlan('year')}
            className={`plan-card ${plan === 'year' ? 'selected' : ''}`}
            style={{ position: 'relative' }} 
          >

            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                backgroundColor: '#facc15',
                color: '#1a1a2e',
                fontWeight: 'bold',
                padding: '4px 12px',
                borderTopLeftRadius: '16px',
                borderBottomRightRadius: '16px',
                fontSize: '0.85rem',
                userSelect: 'none',
                zIndex: 10,
              }}
            >
              Save 20%
            </div>

            <input
              type="radio"
              name="plan"
              value="year"
              checked={plan === 'year'}
              onChange={() => setPlan('year')}
              style={{ display: 'none' }}
            />
            <div style={{ position: 'absolute', top: '16px', right: '16px' }}>
              <div style={radioStyle(plan === 'year')}></div>
            </div>

            <h1 style={{ fontSize: '1.5rem', marginTop: '8px' }}>Annual Plan</h1>
            <div style={priceBoxStyle}>${products.year.price} / year</div>
            <p>Billed annually</p>
            <p style={detailStyle}>{products.year.trial_days}-day free trial</p>
          </label>


          <label
            onClick={() => setPlan('monthly')}
            className={`plan-card ${plan === 'monthly' ? 'selected' : ''}`}
          >
            <input
              type="radio"
              name="plan"
              value="monthly"
              checked={plan === 'monthly'}
              onChange={() => setPlan('monthly')}
              style={{ display: 'none' }}
            />
            <div style={{ position: 'absolute', top: '16px', right: '16px' }}>
              <div style={radioStyle(plan === 'monthly')}></div>
            </div>

            <h1 style={{ fontSize: '1.5rem', marginTop: '8px' }}>Monthly Plan</h1>
            <div style={priceBoxStyle}>${products.monthly.price} / month</div>
            <p>Billed monthly</p>
            <p style={detailStyle}>{products.monthly.trial_days}-day free trial</p>
          </label>
        </div>
          <p style={{ color: '#9890d6' }}>Cancel anytime.</p>
        <button
          onClick={() => {
            setClicked(true);
            handleStartTrial();
          }}
          disabled={loading || !plan}
          className={`plan-button 
            ${!plan ? 'plan-disabled' : ''} 
            ${clicked ? 'plan-selected' : (plan ? 'plan-monthly' : '')}
          `}
        >
          {loading ? 'Loading...' : 'Start free trial'}
        </button>

        {error && <p style={{ color: 'red', marginTop: '15px' }}>{error}</p>}

        <div className="footer-terms">
          <a href="/terms">Privacy Policy</a> <span className="separator">|</span>
          <a href="/privacy">Terms of Service</a> <span className="separator">|</span>
          <a href="/terms">Restore Purchase</a>
        </div>
      </div>
    </div>
  );
}

export default Step3Plan;
