import React from 'react';
import styles from './LaunchStatus.module.css';
const LaunchStatus = ({ launchData }) => {
  if (!launchData) return;

  const { launch_success, upcoming } = launchData;
  const getStatus = () => {
    if (upcoming) {
      return { text: 'Upcoming', backgroundColor: 'blue' };
    } else {
      return launch_success
        ? { text: 'Success', backgroundColor: 'green' }
        : { text: 'Failed', backgroundColor: 'red' };
    }
  };

  const { text, backgroundColor } = getStatus();

  return (
    <div
      className={styles.status}
      style={{
        backgroundColor,
        color: 'white',
      }}
    >
      {text}
    </div>
  );
};

export default LaunchStatus;
