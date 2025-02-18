import React, { useState } from 'react';
import './Landing.css';

const Interaction = () => {
  const [hoverText, setHoverText] = useState('');
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

  const areas = [
    {
      name: 'Menu',
      coordinates: { x1: 300, x2: 600, y1: 70, y2: 100 },
      navigate: '/user/shop',
      hoverText: 'Checkout Menu'
    },
    {
      name: 'Man Serving',
      coordinates: { x1: 400, x2: 600, y1: 200, y2: 400 },
      navigate: '/admin/track',
      hoverText: 'Order Dashboard'
    },
    {
      name: 'Lady Sitting',
      coordinates: { x1: 1000, x2: 1300, y1: 400, y2: 600 },
      navigate: '/user/cart',
      hoverText: 'Checkout Cart'
    }
  ];

  const handleNavigation = (path) => {
    window.location.href = path;
  };

  const handleMouseMove = (e, text) => {
    setHoverText(text);
    setHoverPosition({ x: e.clientX, y: e.clientY - 20 });
  };

  return (
    <div className="background-section relative">
      {areas.map((area, index) => (
        <div
          key={index}
          className="absolute cursor-pointer"
          style={{
            left: `${area.coordinates.x1}px`,
            top: `${area.coordinates.y1}px`,
            width: `${area.coordinates.x2 - area.coordinates.x1}px`,
            height: `${area.coordinates.y2 - area.coordinates.y1}px`
          }}
          onClick={() => handleNavigation(area.navigate)}
          onMouseMove={(e) => handleMouseMove(e, area.hoverText)}
          onMouseLeave={() => setHoverText('')}
        />
      ))}

      {hoverText && (
        <div
          style={{
            position: 'absolute',
      top: hoverPosition.y,
      left: hoverPosition.x,
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'white',  // White background
      color: 'black',  // Black text
      fontSize: '18px',
      fontWeight: 'bold',
      padding: '6px 12px',  // Padding for a clean look
      borderRadius: '8px',  // Rounded corners
      boxShadow: '2px 2px 8px rgba(0, 0, 0, 0.2)',  // Soft shadow for depth
      zIndex: 10
          }}
        >
          {hoverText}
        </div>
      )}
    </div>
  );
};

export default Interaction;
