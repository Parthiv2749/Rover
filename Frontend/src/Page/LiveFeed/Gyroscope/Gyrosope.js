import React, { useState, useEffect, useRef } from 'react';
import './Gyroscope.css';

function Gyroscope({x,y}) {
  const outerCircleRef = useRef(null);
  const innerCircleRef = useRef(null);
  const [tiltX, setTiltX] = useState(x);
  const [tiltY, setTiltY] = useState(y);


  const moveInnerCircle = (x, y) => {
    const outerCircle = outerCircleRef.current;
    const innerCircle = innerCircleRef.current;

    const maxOffset = (outerCircle.offsetWidth - innerCircle.offsetWidth) / 2;
    const offsetX = Math.max(-maxOffset, Math.min(maxOffset, x));
    const offsetY = Math.max(-maxOffset, Math.min(maxOffset, y));

    innerCircle.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px))`;
  };

//   Handle gyroscope data
useEffect(() => {
    setTiltX(x);
    setTiltY(y);
  }, [x, y]);



  // Update inner circle position based on gyroscope data
  useEffect(() => {
    const sensitivity = 2;
    const X = tiltX * sensitivity;
    const Y = tiltY * sensitivity;
    moveInnerCircle(X, Y);
    console.log(x,y)
  }, [tiltX, tiltY]);

//   // Handle manual dragging for non-gyroscope devices
//   const onMouseDown = (e) => {
//     setIsDragging(true);
//     setDragStart({ x: e.clientX, y: e.clientY });
//   };

//   const onMouseMove = (e) => {
//     if (isDragging) {
//       const x = (e.clientX - dragStart.x) / 2; // Adjust sensitivity
//       const y = (e.clientY - dragStart.y) / 2;
//       moveInnerCircle(x, y);
//     }
//   };

//   const onMouseUp = () => {
//     setIsDragging(false);
//   };

//   // Attach mouse event listeners for drag interaction
//   useEffect(() => {
//     if (!isGyroscopeAvailable) {
//       window.addEventListener('mousemove', onMouseMove);
//       window.addEventListener('mouseup', onMouseUp);

//       return () => {
//         window.removeEventListener('mousemove', onMouseMove);
//         window.removeEventListener('mouseup', onMouseUp);
//       };
//     }
//   }, [isGyroscopeAvailable, isDragging, dragStart]);

  // Responsive design - Update circle size on window resize
  useEffect(() => {
    const handleResize = () => {
      const size = Math.min(window.innerWidth, window.innerHeight) * 0.5;
      outerCircleRef.current.style.width = `${size}px`;
      outerCircleRef.current.style.height = `${size}px`;
    };

    handleResize(); // Initial size set
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="App">
      <div
        id="outer-circle"
        ref={outerCircleRef}
        className="outer-circle"
        
      >
        <div id="inner-circle" ref={innerCircleRef} className="inner-circle"></div>
        {/* <div id="manual-info" className="manual-info">
          {isGyroscopeAvailable ? 'Tilt your device to interact!' : 'Gyroscope not supported. Drag to interact.'}
        </div> */}
      </div>
    </div>
  );
}


export default Gyroscope;