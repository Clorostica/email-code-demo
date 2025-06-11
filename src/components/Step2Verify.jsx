import { useState } from 'react';

function Step2Verify({ email, onNext }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    if (!code.trim()) {
      setError('Please enter the verification code');
      return;
    }

    setLoading(true);
    setError(null);
    
    const payload = { 
      email: email, 
      code: code.trim() 
    };
    
    try {
      const res = await fetch('http://localhost:8080/api/validate-email', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
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
      setError(e.message || 'Error verifying code');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !loading && code.trim()) {
      handleVerify();
    }
  };

  const handleResendCode = async () => {
    try {
      const payload = { email };
      
      const res = await fetch('http://localhost:8080/api/resend-email-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setError(null);
        alert('Code successfully resent');
      } else {
        setError(data.error || 'Error resending code');
      }
    } catch (e) {
      setError('Error resending code');
    }
  };

  const containerStyle = {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '24px',
    borderRadius: '8px',
    fontFamily: 'Inter',
  };

  const titleStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    marginBottom: '16px',
    textAlign: 'center',
  };

  const textStyle = {
    marginBottom: '16px',
    textAlign: 'center',
  };

  const emailStyle = {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '24px',
    color: '#fbbf24',
  };

  const inputStyle = {
    backgroundColor: '#FFFFFF',
    color: '#000000',
    width: '100%',
    padding: '12px',
    border: '2px solid #ddd',
    borderRadius: '6px',
    fontSize: '18px',
    marginBottom: '16px',
    outline: 'none',
    boxSizing: 'border-box',
  };

    const buttonStyle = {
      width: '100%',
      padding: '12px',
      backgroundColor: loading || !code.trim() ? '#988fd6' : '#007bff',
      color: 'rgb(34, 1, 66)',
      border: 'none',
      borderRadius: '6px',
      fontSize: '16px',
      cursor: loading || !code.trim() ? 'not-allowed' : 'pointer',
      marginTop: '16px',      
      marginBottom: '16px',   
      transition: 'background-color 0.3s',
    };

  const errorStyle = {
    backgroundColor: '#fee',
    border: '1px solid #fcc',
    color: '#c33',
    padding: '12px',
    borderRadius: '6px',
    marginBottom: '16px',
    textAlign: 'center',
  };

  const resendContainerStyle = {
    textAlign: 'center',
    marginTop: '16px',
  };

  return (
    <div style={containerStyle}>
      <p style={textStyle}>We sent you a verification code to</p>
      <p style={emailStyle}>{email}</p>
      
      <div style={{ marginBottom: '16px' }}>
        <input 
          type="text" 
          value={code} 
          onChange={e => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
          onKeyPress={handleKeyPress}
          placeholder="(try: 123456)" 
          style={inputStyle}
          maxLength={6}
          disabled={loading}
        />
      </div>
      
      {error && (
        <div style={errorStyle}>{error}</div>
      )}
      
      <button 
        onClick={handleVerify} 
        disabled={loading || !code.trim()}
        style={buttonStyle}
      >
        {loading ? 'Verifying...' : 'Verify Code'}
      </button>
      
      <div style={resendContainerStyle}>
        <a href="#" onClick={e => { e.preventDefault(); handleResendCode(); }} className="link">
          Resend Code
        </a>
      </div>
    </div>
  );
}

export default Step2Verify;
