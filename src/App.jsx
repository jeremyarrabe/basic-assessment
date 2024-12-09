import React from 'react';
import styles from './App.module.css';

import Home from './pages/Home';
function App() {
  return (
    <div className={styles.appContainer}>
      <Home />
    </div>
  );
}

export default App;
