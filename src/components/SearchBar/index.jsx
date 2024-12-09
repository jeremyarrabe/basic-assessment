import React from 'react';
import styles from './SearchBar.module.css';

const SearchBar = ({ onSearch, value }) => {
  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Search..."
        className={styles.searchInput}
        value={value}
        onChange={onSearch}
      />
    </div>
  );
};

export default SearchBar;
