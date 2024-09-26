import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  
  // State for the current user and expenses
  const [cUser, setcUser] = useState(null); // Initialize as null for clarity
  const [expenses, setExpenses] = useState(0);

  // Fetch user from localStorage and handle avatar redirection
  useEffect(() => {
    const avatarFunc = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        if (user.isAvatarImageSet === false || !user.avatarImage) {
          navigate("/setAvatar");
        }
        setcUser(user);
      } else {
        navigate("/login");
      }
    };

    avatarFunc();
  }, [navigate]);

  const handleShowLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  }

  // Simulate fetching total expenses from an API
  useEffect(() => {
    const fetchExpenses = async () => {
      const totalExpenses = 2500; // Example data
      setExpenses(totalExpenses);
    };

    fetchExpenses();
  }, []);

  // Log out function
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate('/login');
  };

  // Navigate to other pages
  const navigateToExpenses = () => navigate('/');
  const navigateToAddExpense = () => navigate('/');

  return (
    <div style={styles.container}>
      {/* Conditional rendering for user */}
      <h1>Welcome, {cUser ? cUser.name : 'Guest'}!</h1>
      
      {/* <div style={styles.summaryCard}>
        <h2>Total Expenses</h2>
        <p>${expenses}</p>
      </div> */}

      <div style={styles.actions}>
        <button onClick={navigateToExpenses} style={styles.button}>View All Expenses</button>
        <button onClick={navigateToAddExpense} style={styles.button}>Add New Expense</button>
        <button onClick={handleLogout} style={styles.logoutButton}>Log Out</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '50px',
    fontFamily: 'Arial, sans-serif',
  },
  summaryCard: {
    margin: '20px auto',
    padding: '20px',
    width: '300px',
    background: '#f5f5f5',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  actions: {
    marginTop: '20px',
  },
  button: {
    margin: '10px',
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  logoutButton: {
    margin: '10px',
    padding: '10px 20px',
    backgroundColor: '#f44336',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default HomePage;
