import React from 'react';

function Step4Success() {
  const [showConfetti, setShowConfetti] = React.useState(false);
  const [currentMessage, setCurrentMessage] = React.useState(0);
  const [showBenefits, setShowBenefits] = React.useState(false);

  const messages = [
    "Congrats! 🎉",
    "You're now a suscriber",
  ];

  React.useEffect(() => {
    setShowConfetti(true);

    const messageInterval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % messages.length);
    }, 2000);

    const benefitsTimer = setTimeout(() => {
      setShowBenefits(true);
    }, 3000);

    return () => {
      clearInterval(messageInterval);
      clearTimeout(benefitsTimer);
    };
  }, []);

  const handleCelebrate = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 2000);
  };

  const handleStartJourney = () => {
    alert("Redirecting to your dashboard...");
  };

  return (
    <div style={{
      textAlign: 'center',
      padding: '40px 20px',
      background: '#1a1a2e',
      minHeight: '100vh',
      color: 'white',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      fontFamily: '"Segoe UI", sans-serif'
    }}>

      {showConfetti && (
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '100%',
          pointerEvents: 'none',
          background: `
            radial-gradient(circle at 20% 80%, gold 2px, transparent 2px),
            radial-gradient(circle at 80% 20%, #ff6b6b 2px, transparent 2px),
            radial-gradient(circle at 40% 40%, #4ecdc4 2px, transparent 2px)
          `,
          backgroundSize: '50px 50px',
          animation: 'confetti 2s ease-out'
        }} />
      )}

      <style>{`
        @keyframes confetti {
          0% { transform: translateY(-100px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
      `}</style>

      <div style={{
        animation: 'bounce 2s infinite',
        marginBottom: '30px'
      }}>
        <h1 style={{
          fontSize: '2.5rem',
          marginBottom: '10px',
          textShadow: '2px 2px 6px rgba(0,0,0,0.4)'
        }}>
          {messages[currentMessage]}
        </h1>
        <p> Explore your membership now</p>
        <div style={{
          fontSize: '3rem',
          animation: 'pulse 1s infinite'
        }}>
          🎊
        </div>
      </div>

        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'center',
          flexWrap: 'wrap',
          animation: 'fadeInUp 1s ease-out 1s both',
          maxWidth: '300px',
          margin: '0 auto',
          borderRadius: '6px',
        }}>
        <button
          onClick={handleCelebrate}
          className="btn btn-celebrate"
        >
          🎉 Celebrate again
        </button>

        <button
          onClick={handleStartJourney}
          className="btn btn-dashboard"
        >
          🚀 Go to Dashboard
        </button>

      </div>

    </div>
  );
}

export default Step4Success;
