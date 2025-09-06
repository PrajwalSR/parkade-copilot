import React, { useState, useMemo } from 'react';
import styles from './Problems.module.css'; // We will create this file in the next step

const Problems = () => {
    // Data from your Parking_Problems.csv file
    const [problems, setProblems] = useState([
        {
            "problemId": 501,
            "reservationId": 404,
            "memberId": 111,
            "reservationStatus": "Overstayed",
            "problemStatus": "Resolved",
            "problemDetails": "Overstayed, Charged $20 extra"
        },
        {
            "problemId": 502,
            "reservationId": 405,
            "memberId": 111,
            "reservationStatus": "Overstayed",
            "problemStatus": "Resolved",
            "problemDetails": "Overstayed, Charged $10 extra"
        },
        {
            "problemId": 503,
            "reservationId": 406,
            "memberId": 101,
            "reservationStatus": "Overstayed",
            "problemStatus": "Resolved",
            "problemDetails": "Overstayed, Towed to different spot"
        },
        {
            "problemId": 504,
            "reservationId": 407,
            "memberId": 101,
            "reservationStatus": "Overstayed",
            "problemStatus": "Resolved",
            "problemDetails": "Issued Warning to Member"
        },
        {
            "problemId": 505,
            "reservationId": 408,
            "memberId": 112,
            "reservationStatus": "Completed",
            "problemStatus": "Resolved",
            "problemDetails": "Parking spot occupied by other vehicle, reassigned a new spot"
        },
        {
            "problemId": 506,
            "reservationId": 409,
            "memberId": 112,
            "reservationStatus": "Completed",
            "problemStatus": "Resolved",
            "problemDetails": "Parking spot occupied by other vehicle, reassigned a new spot"
        },
        {
            "problemId": 507,
            "reservationId": 410,
            "memberId": 113,
            "reservationStatus": "Completed",
            "problemStatus": "Unresolved",
            "problemDetails": "Payment issue"
        },
        {
            "problemId": 508,
            "reservationId": 411,
            "memberId": 114,
            "reservationStatus": "Completed",
            "problemStatus": "Unresolved",
            "problemDetails": "Overcharged for a reservation"
        },
        {
            "problemId": 509,
            "reservationId": 412,
            "memberId": 115,
            "reservationStatus": "Completed",
            "problemStatus": "Unresolved",
            "problemDetails": "Needs to extend the reservation"
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'problemId', direction: 'ascending' });

    const filteredAndSortedProblems = useMemo(() => {
        let sortableItems = [...problems];

        if (searchTerm) {
            sortableItems = sortableItems.filter(item =>
                Object.values(item).some(val =>
                    String(val).toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        }

        if (sortConfig.key !== null) {
            sortableItems.sort((a, b) => {
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
        return sortableItems;
    }, [problems, searchTerm, sortConfig]);

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
                <h1 className={styles.title}>Parking Problems</h1>
                <div className={styles.actions}>
                    <button className={styles.button}>Filters</button>
                    <button className={`${styles.button} ${styles.primary}`}>+ Log Problem</button>
                </div>
            </header>

            <div className={styles.content}>
                <div className={styles.searchBarContainer}>
                    <input
                        type="text"
                        placeholder="Search..."
                        className={styles.searchInput}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th onClick={() => requestSort('problemId')}>Problem ID {getSortIndicator('problemId')}</th>
                                <th onClick={() => requestSort('reservationId')}>Reservation ID {getSortIndicator('reservationId')}</th>
                                <th onClick={() => requestSort('memberId')}>Member ID {getSortIndicator('memberId')}</th>
                                <th onClick={() => requestSort('reservationStatus')}>Reservation Status {getSortIndicator('reservationStatus')}</th>
                                <th onClick={() => requestSort('problemStatus')}>Problem Status {getSortIndicator('problemStatus')}</th>
                                <th onClick={() => requestSort('problemDetails')}>Problem Details {getSortIndicator('problemDetails')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAndSortedProblems.map((item) => (
                                <tr key={item.problemId}>
                                    <td>{item.problemId}</td>
                                    <td>{item.reservationId}</td>
                                    <td>{item.memberId}</td>
                                    <td>{item.reservationStatus}</td>
                                    <td>{item.problemStatus}</td>
                                    <td>{item.problemDetails}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Problems;