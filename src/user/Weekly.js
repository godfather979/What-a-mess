import React, { useState } from 'react';
import { Salad, Heart, AlertTriangle } from 'lucide-react';

const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    padding: '16px',
  },
  card: {
    backgroundColor: 'white',
    padding: '16px',
    borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  },
  cardTitle: {
    fontSize: '1.25rem',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '16px',
  },
  junkItem: {
    backgroundColor: '#FEE2E2',
    borderLeft: '4px solid #EF4444',
    padding: '8px',
    marginBottom: '8px',
    borderRadius: '4px',
  },
  healthyItem: {
    backgroundColor: '#D1FAE5',
    borderLeft: '4px solid #10B981',
    padding: '8px',
    marginBottom: '8px',
    borderRadius: '4px',
  },
  inputContainer: {
    display: 'flex',
    marginBottom: '16px',
  },
  input: {
    flexGrow: 1,
    padding: '8px',
    border: '1px solid #D1D5DB',
    borderTopLeftRadius: '8px',
    borderBottomLeftRadius: '8px',
  },
  button: {
    backgroundColor: '#3B82F6',
    color: 'white',
    padding: '8px 16px',
    borderTopRightRadius: '8px',
    borderBottomRightRadius: '8px',
  },
  alternativeResult: {
    backgroundColor: '#D1FAE5',
    padding: '12px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
  }
};

const WeeklyOrderTracker = () => {
  const [weeklyOrders] = useState([
    { day: 'Monday', item: 'Chicken Burger', calories: 450, type: 'junk' },
    { day: 'Tuesday', item: 'Grilled Chicken Salad', calories: 250, type: 'healthy' },
    { day: 'Wednesday', item: 'Pizza', calories: 600, type: 'junk' },
    { day: 'Thursday', item: 'Vegetable Stir Fry', calories: 300, type: 'healthy' },
    { day: 'Friday', item: 'Biryani', calories: 500, type: 'junk' }
  ]);

  const totalCalories = weeklyOrders.reduce((sum, order) => sum + order.calories, 0);
  const dailyCalorieLimit = 2000;

  return (
    <div style={styles.card}>
      <h2 style={styles.cardTitle}>
        <Heart style={{marginRight: '8px', color: '#EF4444'}} /> Weekly Order Tracker
      </h2>
      {weeklyOrders.map((order) => (
        <div 
          key={order.day}
          style={order.type === 'junk' ? styles.junkItem : styles.healthyItem}
        >
          <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <span>{order.day}: {order.item}</span>
            <span>{order.calories} cal</span>
          </div>
        </div>
      ))}
      <div style={{marginTop: '16px', textAlign: 'center'}}>
        <p>Total Weekly Calories: {totalCalories}</p>
        <p style={{color: totalCalories > dailyCalorieLimit ? '#EF4444' : '#10B981'}}>
          {totalCalories > dailyCalorieLimit 
            ? 'Exceeded recommended daily calories' 
            : 'Within recommended daily calories'}
        </p>
      </div>
    </div>
  );
};

const HealthyAlternativeFinder = () => {
  const [craving, setCraving] = useState('');
  const [alternative, setAlternative] = useState(null);

  const junkToHealthyOptions = {
    'pizza': { 
      healthy: 'Vegetable Wrap', 
      calories: 300, 
      benefits: 'High in fiber, lower in calories' 
    },
    'burger': { 
      healthy: 'Grilled Chicken Salad', 
      calories: 250, 
      benefits: 'Lean protein, more nutrients' 
    },
    'french fries': { 
      healthy: 'Baked Sweet Potato Wedges', 
      calories: 180, 
      benefits: 'Rich in vitamins, lower fat' 
    }
  };

  const findAlternative = () => {
    const lowercaseCraving = craving.toLowerCase().trim();
    const match = junkToHealthyOptions[lowercaseCraving];
    setAlternative(match || null);
  };

  return (
    <div style={styles.card}>
      <h2 style={styles.cardTitle}>
        <Salad style={{marginRight: '8px', color: '#10B981'}} /> Healthy Craving Alternatives
      </h2>
      <div style={styles.inputContainer}>
        <input 
          type="text" 
          value={craving}
          onChange={(e) => setCraving(e.target.value)}
          placeholder="Enter your junk food craving"
          style={styles.input}
        />
        <button 
          onClick={findAlternative}
          style={styles.button}
        >
          Find Alternative
        </button>
      </div>
      {alternative && (
        <div style={styles.alternativeResult}>
          <AlertTriangle style={{marginRight: '8px', color: '#FBBF24'}} />
          <div>
            <p>Instead of {craving}, try {alternative.healthy}!</p>
            <p>Calories: {alternative.calories} | {alternative.benefits}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const Weekly = () => {
  return (
    <div style={styles.container}>
      <WeeklyOrderTracker />
      <HealthyAlternativeFinder />
    </div>
  );
};

export default Weekly;