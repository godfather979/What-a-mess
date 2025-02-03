import React from 'react';
//import './App.css';
import can from '../images/can.jpg'
import admin from '../images/admin.jpg'
import order from '../images/order.jpg'

const Carousel = () => {
    // Define card data to make it easier to duplicate
    const cards = [
      { id: 1, label: "Healthier", color: "blue", image: can },
      { id: 2, label: "Sustainable", color: "green", image: admin },
      { id: 3, label: "Delicious", color: "red", image: order },
    ];
  
    return (
      <div className="carousel-container">
        <div className="cards-section">
           
          <div className="cards-container" style={{ animation: 'carousel 15s linear infinite' }}>
            {/* Create multiple sets of cards to ensure continuous scroll */}
            {[...Array(4)].map((_, setIndex) => (
              <React.Fragment key={setIndex}>
                {cards.map((card) => (
                  <div className="card" key={`${setIndex}-${card.id}`}>
                    <img src={card.image} alt={card.label} className="card-img" />
                    <div className={`card-label ${card.color}`}>{card.label}</div>
                  </div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </div>
        <style jsx global>{`
          .cards-container {
            display: flex;
            gap: 50px;
            /* Ensure there's no flex-wrap */
            flex-wrap: nowrap;
            /* Move cards to starting position */
            transform: translateX(0);
          }
  
          @keyframes carousel {
            0% {
              transform: translateX(0);
            }
            100% {
              /* Adjust this value based on the total width of one complete set of cards */
              transform: translateX(calc(-100% / 4));
            }
          }
  
          /* Override some of the original CSS to ensure seamless scrolling */
          .carousel-container {
            margin: 0;
            padding: 0;
            width: 100%;
            overflow: hidden;
          }
  
          .cards-section {
            margin: 0;
            padding: 20px 0;
            overflow: hidden;
            width: 100%;
          }
  
          /* Ensure cards maintain their size and don't shrink */
          .card {
            flex: 0 0 300px;
          }
        `}</style>
      </div>
    );
  };
  export default Carousel;