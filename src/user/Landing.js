import React from 'react';
import './Landing.css'; // Ensure your CSS is included
import{ motion } from 'framer-motion';
import Carousel from './Carousel';
import Chart from './Chart';
import Weekly from './Weekly';
//import Canteen from './Canteen';


function Landing() {
  const cardData = [
    {
      id: 1,
      label: 'Healthier',
      placeholder: '/api/placeholder/300/300',
      labelColor: 'blue'
    },
    {
      id: 2,
      label: 'Sustainable',
      placeholder: '/api/placeholder/300/300',
      labelColor: 'green'
    },
    {
      id: 3,
      label: 'Delicious',
      placeholder: '/api/placeholder/300/300',
      labelColor: 'red'
    }
  ];

  return (
    <div className="App">
      <div className="landing-container">
        <div className="what-a-mess-container">
          <motion.h1
            className="what-a-mess"
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            What a Mess
          </motion.h1>
        </div>
        <div className="reduce-the-mess-container">
          <motion.p
            className="reduce-the-mess"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <em>Reduce the mess <br /> With Us</em>
          </motion.p>
        </div>
      </div>

      {/* Cards Section: This will be placed under landing-container */}
      <motion.h1 
  className="specials"
  animate={{ 
    textShadow: [
      "0px 0px 10px rgba(236, 245, 247, 0.8)",  
      "0px 0px 20px rgb(0, 89, 255)",  
      "0px 0px 30px rgb(0, 255, 208)",  
      "0px 0px 20px rgb(0, 242, 255)",  
      "0px 0px 10px rgba(255, 255, 255, 0.8)"
    ]
  }}
  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
>
  Today's Specials
</motion.h1>
  <div class="carousel-container">
  
    <Carousel/>
    
  </div>
   <div>
    <Chart/>
   </div>
   <div><Weekly/></div>
   {/* <div className="canteen-container">
        <Canteen /> 
      </div> */}
    </div>
  );
}

export default Landing;
