import React, { useState, useMemo } from 'react';
import styles from './Spots.module.css'; // We will create this file in the next step

const Spots = () => {
    // Data from your Spots.csv file
    const [spots, setSpots] = useState([
        {"spotId": 301, "spotNumber": "L1-01", "level": "L1", "spotType": "Standard"},
        {"spotId": 302, "spotNumber": "L1-02", "level": "L1", "spotType": "Standard"},
        {"spotId": 303, "spotNumber": "L1-03", "level": "L1", "spotType": "Standard"},
        {"spotId": 304, "spotNumber": "L1-04", "level": "L1", "spotType": "Compact"},
        {"spotId": 305, "spotNumber": "L1-05", "level": "L1", "spotType": "Compact"},
        {"spotId": 306, "spotNumber": "L1-06", "level": "L1", "spotType": "Standard"},
        {"spotId": 307, "spotNumber": "L1-07", "level": "L1", "spotType": "Standard"},
        {"spotId": 308, "spotNumber": "L1-08", "level": "L1", "spotType": "Standard"},
        {"spotId": 309, "spotNumber": "L1-09", "level": "L1", "spotType": "Accessible"},
        {"spotId": 310, "spotNumber": "L1-10", "level": "L1", "spotType": "Accessible"},
        {"spotId": 311, "spotNumber": "L1-11", "level": "L1", "spotType": "Accessible"},
        {"spotId": 312, "spotNumber": "L1-12", "level": "L1", "spotType": "EV"},
        {"spotId": 313, "spotNumber": "L1-13", "level": "L1", "spotType": "EV"},
        {"spotId": 314, "spotNumber": "L1-14", "level": "L1", "spotType": "EV"},
        {"spotId": 315, "spotNumber": "L1-15", "level": "L1", "spotType": "Delivery Trucks"},
        {"spotId": 316, "spotNumber": "L2-01", "level": "L2", "spotType": "Compact"},
        {"spotId": 317, "spotNumber": "L2-02", "level": "L2", "spotType": "Compact"},
        {"spotId": 318, "spotNumber": "L2-03", "level": "L2", "spotType": "Compact"},
        {"spotId": 319, "spotNumber": "L2-04", "level": "L2", "spotType": "Compact"},
        {"spotId": 320, "spotNumber": "L2-05", "level": "L2", "spotType": "Compact"},
        {"spotId": 321, "spotNumber": "L2-06", "level": "L2", "spotType": "Standard"},
        {"spotId": 322, "spotNumber": "L2-07", "level": "L2", "spotType": "Standard"},
        {"spotId": 323, "spotNumber": "L2-08", "level": "L2", "spotType": "Standard"},
        {"spotId": 324, "spotNumber": "L2-09", "level": "L2", "spotType": "Standard"},
        {"spotId": 325, "spotNumber": "L2-10", "level": "L2", "spotType": "Standard"},
        {"spotId": 326, "spotNumber": "L2-11", "level": "L2", "spotType": "Standard"},
        {"spotId": 327, "spotNumber": "L2-12", "level": "L2", "spotType": "Standard"},
        {"spotId": 328, "spotNumber": "L2-13", "level": "L2", "spotType": "Standard"},
        {"spotId": 329, "spotNumber": "L2-14", "level": "L2", "spotType": "Standard"},
        {"spotId": 330, "spotNumber": "L2-15", "level": "L2", "spotType": "Standard"},
        {"spotId": 331, "spotNumber": "L2-16", "level": "L2", "spotType": "Standard"},
        {"spotId": 332, "spotNumber": "L2-17", "level": "L2", "spotType": "Standard"},
        {"spotId": 333, "spotNumber": "L2-18", "level": "L2", "spotType": "Standard"},
        {"spotId": 334, "spotNumber": "L2-19", "level": "L2", "spotType": "Standard"},
        {"spotId": 335, "spotNumber": "L2-20", "level": "L2", "spotType": "Standard"}
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'spotNumber', direction: 'ascending' });

    const filteredAndSortedSpots = useMemo(() => {
        let sortableSpots = [...spots];

        if (searchTerm) {
            sortableSpots = sortableSpots.filter(spot =>
                spot.spotNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                spot.level.toLowerCase().includes(searchTerm.toLowerCase()) ||
                spot.spotType.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (sortConfig.key !== null) {
            sortableSpots.sort((a, b) => {
                const valA = a[sortConfig.key];
                const valB = b[sortConfig.key];
                if (valA < valB) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (valA > valB) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableSpots;
    }, [spots, searchTerm, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const getSortIndicator = (key) => {
        if (sortConfig.key !== key) return '↕';
        return sortConfig.direction === 'ascending' ? '↑' : '↓';
    };

    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>
                <h1 className={styles.title}>Spots</h1>
                <div className={styles.actions}>
                    <button className={styles.button}>Filters</button>
                    <button className={`${styles.button} ${styles.primary}`}>+ Add Spot</button>
                </div>
            </header>

            <div className={styles.content}>
                <div className={styles.searchBarContainer}>
                    <input
                        type="text"
                        placeholder="Search by spot number, level, or type..."
                        className={styles.searchInput}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th onClick={() => requestSort('spotId')}>Spot ID {getSortIndicator('spotId')}</th>
                                <th onClick={() => requestSort('spotNumber')}>Spot Number {getSortIndicator('spotNumber')}</th>
                                <th onClick={() => requestSort('level')}>Level {getSortIndicator('level')}</th>
                                <th onClick={() => requestSort('spotType')}>Spot Type {getSortIndicator('spotType')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAndSortedSpots.map((spot) => (
                                <tr key={spot.spotId}>
                                    <td>{spot.spotId}</td>
                                    <td>{spot.spotNumber}</td>
                                    <td>{spot.level}</td>
                                    <td>{spot.spotType}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Spots;