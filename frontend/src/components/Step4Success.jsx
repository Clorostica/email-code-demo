import { useState } from "react";

export function Step4Success() {
  const [confettiKey, setConfettiKey] = useState(0);

  const handleCelebrate = () => {
    setConfettiKey((prev) => prev + 1);
  };

  const generateConfetti = () => {
    const colors = [
      "#FFD700",
      "#FF6B6B",
      "#4ECDC4",
      "#95E1D3",
      "#F38181",
      "#AA96DA",
      "#FCBAD3",
      "#FFFFD2",
    ];

    const shapes = ["circle", "square", "triangle"];
    const confettiPieces = [];

    for (let i = 0; i < 80; i++) {
      const left = Math.random() * 100;
      const delay = Math.random() * 0.5;
      const duration = 3 + Math.random() * 2;
      const rotation = Math.random() * 360;
      const size = 6 + Math.random() * 6;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const shape = shapes[Math.floor(Math.random() * shapes.length)];

      confettiPieces.push(
        <div
          key={`${confettiKey}-${i}`}
          className={`confetti-piece ${shape}`}
          style={{
            left: `${left}%`,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`,
            backgroundColor: shape !== "triangle" ? color : "transparent",
            borderBottomColor: shape === "triangle" ? color : "transparent",
            width: `${size}px`,
            height: shape === "triangle" ? "0px" : `${size}px`,
            transform: `rotate(${rotation}deg)`,
          }}
        />
      );
    }
    return confettiPieces;
  };

  return (
    <div className="success-container">
      <div className="confetti-container">{generateConfetti()}</div>

      <div className="success-content">
        <div className="success-icon-wrapper">
          <div className="success-icon">🎉</div>
          <div className="success-glow"></div>
        </div>

        <h1 className="success-title">Congrats!</h1>
        <p className="success-subtitle">You're now a subscriber</p>
        <p className="success-message">Explore your membership now</p>

        <div className="success-actions">
          <button onClick={handleCelebrate} className="celebrate-button">
            🎊 Celebrate Again
          </button>
          <button className="dashboard-button">🚀 Go to Dashboard</button>
        </div>
      </div>
    </div>
  );
}
