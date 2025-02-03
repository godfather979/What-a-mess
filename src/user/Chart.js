import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Coffee, Pizza, Utensils } from 'lucide-react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Chart = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [menu, setMenu] = useState([]);

  const foodData = [
    { name: 'Vada Pav', prepTime: 15, icon: <Utensils className="food-icon orange" /> },
    { name: 'Poha', prepTime: 20, icon: <Utensils className="food-icon yellow" /> },
    { name: 'Coffee', prepTime: 5, icon: <Coffee className="food-icon brown" /> },
    { name: 'Misal Pav', prepTime: 25, icon: <Utensils className="food-icon red" /> },
    { name: 'Samosa', prepTime: 18, icon: <Pizza className="food-icon amber" /> }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const foodItem = foodData.find(item => item.name === label);
      return (
        <div className="tooltip">
          <div className="tooltip-header">
            {foodItem.icon}
            <span className="tooltip-title">{label}</span>
          </div>
          <p className="tooltip-content">Prep Time: {payload[0].value} minutes</p>
        </div>
      );
    }
    return null;
  };
  const mealPlan = {
  Monday: ["Pasta", "Misal", "Poha"],
  Tuesday: ["Pizza", "Maggi", "Sandwich"],
  Wednesday: ["Idli", "Dosa", "Upma"],
  Thursday: ["Pav Bhaji", "Frankie", "Chicken Roll"],
  Friday: ["Noodles", "Manchurian", "Dal Rice"],
  // You can also add Saturday and Sunday if needed
};

const handleDateChange = (date) => {
  setSelectedDate(date);
  const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' }); // Get the day of the week
  const menuForTheDay = mealPlan[dayOfWeek] || ["No meals planned for today"]; // Default fallback
  setMenu(menuForTheDay);
};

  return (
    <div className="dashboard-container">
      <div className="chart-container">
        <h2 className="chart-title">Trending Items Preparation Time</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={foodData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" className="grid-lines" />
            <XAxis dataKey="name" tick={{ fill: '#4B5563' }} axisLine={{ stroke: '#9CA3AF' }} />
            <YAxis label={{ value: 'Preparation Time (min)', angle: -90, position: 'insideLeft' }} tick={{ fill: '#4B5563' }} axisLine={{ stroke: '#9CA3AF' }} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="prepTime" stroke="#3B82F6" strokeWidth={3} dot={{ stroke: '#2563EB', strokeWidth: 2, fill: '#FFFFFF', r: 6 }} activeDot={{ stroke: '#1E40AF', strokeWidth: 2, fill: '#3B82F6', r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="calendar-container">
        <h2 className="calendar-title">Select a Date</h2>
        <DatePicker selected={selectedDate} onChange={handleDateChange} className="date-picker" />
        <h3 className="menu-title">Menu for {selectedDate.toDateString()}</h3>
        <ul className="menu-list">
          {menu.map((item, index) => (
            <li key={index} className="menu-item">{item}</li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        .dashboard-container {
          display: flex;
          gap: 40px;
          justify-content: center;
          align-items: flex-start;
          padding: 24px;
        }
           .chart-section {
          margin-bottom: 60px;
          opacity: 1;
        }
        .chart-container, .calendar-container {
          width: 45%;
          background: white;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .chart-title, .calendar-title {
          text-align: center;
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 16px;
        }
        .menu-title {
          font-size: 18px;
          margin-top: 16px;
        }
        .menu-list {
          list-style: none;
          padding: 0;
        }
        .menu-item {
          background: #f3f4f6;
          padding: 8px;
          margin: 4px 0;
          border-radius: 6px;
        }
           .food-icon {
          width: 24px;
          height: 24px;
        }
          .food-icon.orange { color: #f97316; }
        .food-icon.yellow { color: #eab308; }
        .food-icon.brown { color: #8b4513; }
        .food-icon.red { color: #ef4444; }
        .food-icon.amber { color: #f59e0b; }

      `}</style>
    </div>
  );
};

export default Chart;
