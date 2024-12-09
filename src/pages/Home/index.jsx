import React, { useEffect, useState, useRef } from 'react';
import SearchBar from '../../components/SearchBar';
import MissionCard from '../../components/MissionCard';
import Spinner from '../../components/Spinner';
import styles from './Home.module.css';

const Home = () => {
  const API_URL = 'https://api.spacexdata.com/v3/launches';
  const LIMIT = 10;

  const [missions, setMissions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const observerRef = useRef();

  const sortMissions = (missionsData) => {
    return missionsData.sort((a, b) => new Date(b.launch_date_utc) - new Date(a.launch_date_utc));
  };

  const fetchMissions = async () => {
    if (!hasMore) return;
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}?limit=${LIMIT}&offset=${offset}&order=desc`);
      const newMissions = await response.json();

      if (newMissions.length < LIMIT) setHasMore(false);

      setMissions((prevMissions) => {
        const updatedMissions = [...prevMissions, ...newMissions];
        return sortMissions(updatedMissions);
      });

      setOffset((prevOffset) => prevOffset + LIMIT);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredMissions = missions.filter((mission) =>
    mission.mission_name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  useEffect(() => {
    fetchMissions();
    // eslint-disable-next-line
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoading) {
          fetchMissions();
        }
      },
      { threshold: 1.0 },
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => observer.disconnect();
    // eslint-disable-next-line
  }, [isLoading]);

  if (error) {
    return <p className={styles.error}>Error: {error.message}</p>;
  }

  return (
    <div className={styles.homeContainer}>
      <SearchBar onSearch={handleSearchChange} value={searchQuery} />
      <p className={styles.missionCount}>
        {filteredMissions.length} mission{filteredMissions.length !== 1 ? 's' : ''}
      </p>
      <div className={styles.cardContainer}>
        {filteredMissions.length === 0 ? (
          <p>No missions found.</p>
        ) : (
          filteredMissions.map((mission) => (
            <MissionCard
              key={mission.mission_name}
              title={mission.mission_name}
              launchDate={mission.launch_year}
              isUpcoming={mission.upcoming}
              launchStatus={mission.launch_success}
              description={mission.details}
              missionImage={mission.links.mission_patch}
              articleLink={mission.links.article_link}
              video={mission.links.video_link}
            />
          ))
        )}
      </div>
      <div ref={observerRef} style={{ height: '20px', margin: '10px 0' }}>
        {isLoading && <Spinner />}
      </div>
      {!hasMore && <p style={{ textAlign: 'center' }}>End of list.</p>}
    </div>
  );
};

export default Home;
