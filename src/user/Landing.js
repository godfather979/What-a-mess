import React, { useRef, useState } from "react";
import "./Landing.css"; // Ensure your CSS is included
import { motion } from "framer-motion";
import Carousel from "./Carousel";
import Chart from "./Chart";
import Weekly from "./Weekly";
import { useNavigate } from "react-router-dom";
// import Interaction from './Interaction';

function Landing() {
  const navigate = useNavigate();
  const imageRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [hoverText, setHoverText] = useState("");
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });

  // const handleImageClick = (event) => {
  //   const rect = imageRef.current.getBoundingClientRect();
  //   const x = event.clientX - rect.left;
  //   const y = event.clientY - rect.top;

  //   const areas = [
  //     {
  //       name: ' check inventory',
  //       coordinates: {
  //         x1: 1300, x2: 1500,
  //         y1: 400, y2: 600
  //       },
  //       route: '/admin/inventory'
  //     }
  //   ];

  //   const clickedArea = areas.find(area =>
  //     x >= area.coordinates.x1 && x <= area.coordinates.x2 &&
  //     y >= area.coordinates.y1 && y <= area.coordinates.y2
  //   );

  //   if (clickedArea) {
  //     navigate(clickedArea.route);
  //   }
  // };
  const areas = [
    {
      name: "Inventory",
      x1: 1300,
      x2: 1500,
      y1: 400,
      y2: 600,
      route: "/admin/inventory",
    },
    {
      name: "Track orders",
      x1: 1000,
      x2: 1300,
      y1: 250,
      y2: 400,
      route: "/admin/track",
    },
    {
      name: "Checkout menu",
      x1: 600,
      x2: 900,
      y1: 250,
      y2: 400,
      route: "/user/shop",
    },
  ];
  const handleImageClick = (event) => {
    const rect = imageRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    console.log(`Clicked at X: ${x}, Y: ${y}`);

    // const areas = [
    //   { name: 'check inventory', x1: 1300, x2: 1500, y1: 400, y2: 600, route: '/admin/inventory' },
    //   { name: 'track orders', x1: 1000, x2: 1200, y1: 300, y2: 500, route: '/admin/track' },
    //   { name: 'check menu', x1: 700, x2: 900, y1: 200, y2: 400, route: '/user/shop' }
    // ];

    const clickedArea = areas.find(
      (area) => x >= area.x1 && x <= area.x2 && y >= area.y1 && y <= area.y2
    );

    if (clickedArea) {
      console.log(`Navigating to: ${clickedArea.route}`);
      navigate(clickedArea.route);
    } else {
      console.log("Clicked outside defined areas.");
    }
  };

  // const handleMouseEnter = (event) => {
  //   const rect = imageRef.current.getBoundingClientRect();
  //   const x = event.clientX - rect.left;
  //   const y = event.clientY - rect.top;

  //   // Check if the mouse is inside the defined coordinates
  //   if (
  //     x >= 1300 && x <= 1500 &&
  //     y >= 400 && y <= 600
  //   ) {
  //     setIsHovered(true);
  //     setHoverPosition({ x, y });
  //   }
  // };
  const handleMouseMove = (event) => {
    const rect = imageRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const hoveredArea = areas.find(
      (area) => x >= area.x1 && x <= area.x2 && y >= area.y1 && y <= area.y2
    );

    if (hoveredArea) {
      setIsHovered(true);
      setHoverText(hoveredArea.name);
      setHoverPosition({ x, y });
    } else {
      setIsHovered(false);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className="App">
      <div
        className="landing-container"
        ref={imageRef}
        onClick={handleImageClick}
        style={{ cursor: "pointer" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
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
            <em>
              Reduce the mess <br /> With Us
            </em>
          </motion.p>
        </div>

        {/* Hover effect area */}
        {isHovered && (
          <div
            style={{
              position: "absolute",
              top: hoverPosition.y,
              left: hoverPosition.x,
              transform: "translate(-50%, -50%)",
              zIndex: 1,
              backgroundColor: "white",
              padding: "8px",
              borderRadius: "12px",
              border: "4px solid rgb(33, 131, 216)",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
            }}
          >
            <span
              style={{
                color: "rgb(33, 131, 216)",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              {hoverText}
            </span>
          </div>
        )}
      </div>

      {/* Cards Section */}
      <motion.h1
        className="specials"
        animate={{
          textShadow: [
            "0px 0px 10px rgba(236, 245, 247, 0.8)",
            "0px 0px 20px rgb(0, 89, 255)",
            "0px 0px 30px rgb(0, 255, 208)",
            "0px 0px 20px rgb(0, 242, 255)",
            "0px 0px 10px rgba(255, 255, 255, 0.8)",
          ],
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        Today's Specials
      </motion.h1>

      <div className="carousel-container">
        <Carousel />
      </div>

      <div>
        <Chart />
      </div>

      <div>
        <Weekly />
      </div>
      {/* <div>
        <Interaction />
      </div> */}
    </div>
  );
}

export default Landing;
