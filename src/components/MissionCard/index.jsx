import React from 'react';
import styles from './MissionCard.module.css';
import { useState } from 'react';
import { calculateYearsAgo } from '../../helpers/calculateYearsAgo';
import LaunchStatus from '../LaunchStatus';
const MissionCard = ({
  title,
  isUpcoming,
  launchStatus,
  launchDate,
  articleLink,
  video,
  missionImage,
  description,
}) => {
  const [toggle, setToggle] = useState(false);

  const launchData = {
    upcoming: isUpcoming,
    launch_success: launchStatus,
  };

  console.log(description);

  return (
    <div className={styles.card}>
      <div className={styles.heading}>
        <h3>{title}</h3> <LaunchStatus launchData={launchData} />
      </div>
      {toggle && (
        <div>
          <span style={{ fontSize: '0.8rem', display: 'flex', gap: '1rem', marginTop: '20x' }}>
            {calculateYearsAgo(launchDate)} years ago
            {articleLink && (
              <a href={articleLink} target="_blank" rel="noopener noreferrer">
                Article
              </a>
            )}
            {video && (
              <a href={video} target="_blank" rel="noopener noreferrer">
                Video
              </a>
            )}
          </span>

          <div className={styles.cardBody}>
            {missionImage && (
              <img
                src={missionImage}
                alt="mission patch"
                style={{ width: '200px', height: '200px' }}
              />
            )}

            <p>{description ? description : 'No details provided'}</p>
          </div>
        </div>
      )}
      <button className={styles.viewBtn} onClick={() => setToggle(!toggle)}>
        {toggle ? 'Hide' : 'View'}
      </button>
    </div>
  );
};

export default MissionCard;
