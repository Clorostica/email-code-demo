import { useState } from 'react';

function Step1Connect({ onNext }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError(null);

    try {

      const res = await fetch(
      `http://localhost:8080/api/send-email-validation-code?email=${encodeURIComponent(email)}`
    );

      const data = await res.json();
      console.log('Response:', data);

      if (!res.ok) {
        throw new Error(data.error || 'Failed to send email');
      }

      onNext(email.trim());
    } catch (e) {
      console.error('Error:', e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading && email.trim()) {
      handleSubmit();
    }
  };

  const containerStyle = {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '24px',
    fontFamily: 'Inter'
  };

  const titleStyle = {
    fontSize: '25px',
    fontWeight: 'bold',
    marginBottom: '16px',
    textAlign: 'center',
    fontFamily: 'Inter'
  };

  const inputStyle = {
    backgroundColor: '#FFFFFF',
    width: '100%',
    padding: '12px',
    border: '2px solid #ddd',
    borderRadius: '6px',
    fontSize: '16px',
    marginBottom: '16px',
    outline: 'none',
    boxSizing: 'border-box'
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: loading || !email.trim() ? '#988fd6' : '#007bff',
    color: '#220142',
    border: 'none',
    borderRadius: '6px',
    fontSize: '16px',
    cursor: loading || !email.trim() ? 'not-allowed' : 'pointer',
    marginBottom: '12px'
  };

  const errorStyle = {
    backgroundColor: '#fee',
    border: '1px solid #fcc',
    color: '#c33',
    padding: '12px',
    borderRadius: '6px',
    marginBottom: '16px',
    textAlign: 'center'
  };

  const infoStyle = {
    padding: '12px',
    borderRadius: '6px',
    fontSize: '14px',
    textAlign: 'center'
  };

  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Connect with Email</h1>

      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="your@email.com"
        style={inputStyle}
        disabled={loading}
      />

      {error && (
        <div style={errorStyle}>
          {error}
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={loading || !email.trim()}
        style={buttonStyle}
      >
        {loading ? 'Sending...' : 'Send Verification Code'}
      </button>

      <div style={infoStyle}>
        💡 We'll send you a 6-digit verification code to verify your email address
      </div>
    </div>
  );
}

export default Step1Connect;
