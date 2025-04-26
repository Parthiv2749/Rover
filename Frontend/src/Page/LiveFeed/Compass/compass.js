import React, { useState, useEffect } from "react";
import "./compass.css"; // Import the CSS for styling

function Compass({degree}){
  const [heading, setHeading] = useState(0); // Stores the compass heading
//   const [isCalibrating, setIsCalibrating] = useState(false); // Calibration flag

  // Handle device orientation
useEffect(() => {
        setHeading(degree);
        // console.log(degree);
    }, [degree]);


  return (
    <div className="compass-container">
      <div className="compass">
        <div className="compass-face">
          <div className="direction north">N</div>
          <div className="direction east">E</div>
          <div className="direction south">S</div>
          <div className="direction west">W</div>
        </div>
        <div
          className="north-indicator"
          style={{
            transform: `translate(-50%, -100%) rotate(${heading}deg)`,
          }}
        ></div>
      </div>
      <div className="degree-display-container">
        <div className="degree-display">{Math.round(heading * 10) / 10}°</div>
      </div>
    </div>
  );
};

export default Compass;
