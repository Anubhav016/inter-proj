import React, { useState, useEffect } from "react";
import "./styles.css";

const Counter = ({ counterId, customers, onCustomerProcessed }) => {
  const [customerIndex, setCustomerIndex] = useState(0);
  const [items, setItems] = useState(customers[counterId][customerIndex] || []);

  useEffect(() => {
    if (items.length > 0) {
      const interval = setInterval(() => {
        if (items[0] > 0) {
          setItems((prevItems) => [prevItems[0] - 1, ...prevItems.slice(1)]);
        } else {
          clearInterval(interval);
          if (items.length === 1) {
            onCustomerProcessed(counterId);
            setItems([]);
          } else {
            setItems((prevItems) => prevItems.slice(1));
          }
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [counterId, customerIndex, items, onCustomerProcessed]);

  return (
    <div className="counter">
      <div className="counter-label">C{counterId}</div>
      <div className="counter-items">{items[0] || 0}</div>
    </div>
  );
};

const App = () => {
  const [customers, setCustomers] = useState({
    1: [[2, 3]],
    2: [[5]],
    3: [[2, 1, 1]],
    4: [[3]],
    5: [[4]]
  });

  const handleCustomerProcessed = (counterId) => {
    setCustomers((prevCustomers) => {
      const updatedCustomers = { ...prevCustomers };
      if (updatedCustomers[counterId][0][0] === 0) {
        updatedCustomers[counterId][0].shift();
        if (updatedCustomers[counterId][0].length === 0) {
          updatedCustomers[counterId].shift();
        }
      }
      return updatedCustomers;
    });
  };

  return (
    <div className="app">
      <div className="counters">
        {[1, 2, 3, 4, 5].map((counterId) => (
          <Counter
            key={counterId}
            counterId={counterId}
            customers={customers}
            onCustomerProcessed={handleCustomerProcessed}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
