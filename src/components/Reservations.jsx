import React, { useState, useMemo } from 'react';
import styles from './Reservations.module.css'; // We will create this file in the next step

const Reservations = () => {
    // Data from your Reservations.csv file
    const [reservations, setReservations] = useState([
        { "reservationId": 401, "memberId": 101, "spotId": 305, "startTime": "2025-09-01 13:00", "endTime": "2025-09-01 18:00", "status": "Completed", "grossRevenue": 50.0 },
        { "reservationId": 402, "memberId": 101, "spotId": 306, "startTime": "2025-09-01 13:00", "endTime": "2025-09-01 18:00", "status": "Completed", "grossRevenue": 50.0 },
        { "reservationId": 403, "memberId": 101, "spotId": 307, "startTime": "2025-09-01 13:00", "endTime": "2025-09-01 18:00", "status": "Completed", "grossRevenue": 60.0 },
        { "reservationId": 404, "memberId": 111, "spotId": 308, "startTime": "2025-09-02 17:00", "endTime": "2025-09-02 23:00", "status": "Overstayed", "grossRevenue": 60.0 },
        { "reservationId": 405, "memberId": 111, "spotId": 309, "startTime": "2025-09-02 17:00", "endTime": "2025-09-02 23:00", "status": "Overstayed", "grossRevenue": 50.0 },
        { "reservationId": 406, "memberId": 101, "spotId": 305, "startTime": "2025-09-03 06:00", "endTime": "2025-09-03 08:00", "status": "Overstayed", "grossRevenue": 20.0 },
        { "reservationId": 407, "memberId": 101, "spotId": 306, "startTime": "2025-09-03 06:00", "endTime": "2025-09-03 08:00", "status": "Overstayed", "grossRevenue": 20.0 },
        { "reservationId": 408, "memberId": 112, "spotId": 307, "startTime": "2025-09-04 05:00", "endTime": "2025-09-04 14:00", "status": "Completed", "grossRevenue": 90.0 },
        { "reservationId": 409, "memberId": 112, "spotId": 308, "startTime": "2025-09-04 05:00", "endTime": "2025-09-04 14:00", "status": "Completed", "grossRevenue": 90.0 },
        { "reservationId": 410, "memberId": 113, "spotId": 309, "startTime": "2025-09-04 16:00", "endTime": "2025-09-04 23:00", "status": "Completed", "grossRevenue": 55.0 },
        { "reservationId": 411, "memberId": 114, "spotId": 305, "startTime": "2025-09-04 13:00", "endTime": "2025-09-04 18:00", "status": "Completed", "grossRevenue": 40.0 },
        { "reservationId": 412, "memberId": 115, "spotId": 306, "startTime": "2025-09-05 06:00", "endTime": "2025-09-05 09:00", "status": "Completed", "grossRevenue": 30.0 },
        { "reservationId": 413, "memberId": 115, "spotId": 307, "startTime": "2025-09-11 13:00", "endTime": "2025-09-11 18:00", "status": "Upcoming", "grossRevenue": 0.0 },
        { "reservationId": 414, "memberId": 117, "spotId": 308, "startTime": "2025-09-12 17:00", "endTime": "2025-09-12 23:00", "status": "Upcoming", "grossRevenue": 0.0 },
        { "reservationId": 415, "memberId": 118, "spotId": 309, "startTime": "2025-09-13 17:00", "endTime": "2025-09-13 23:00", "status": "Upcoming", "grossRevenue": 0.0 },
        { "reservationId": 416, "memberId": 119, "spotId": 305, "startTime": "2025-09-14 06:00", "endTime": "2025-09-14 08:00", "status": "Upcoming", "grossRevenue": 0.0 },
        { "reservationId": 417, "memberId": 120, "spotId": 306, "startTime": "2025-09-15 06:00", "endTime": "2025-09-15 08:00", "status": "Upcoming", "grossRevenue": 0.0 },
        { "reservationId": 418, "memberId": 121, "spotId": 307, "startTime": "2025-09-15 05:00", "endTime": "2025-09-15 14:00", "status": "Upcoming", "grossRevenue": 0.0 },
        { "reservationId": 419, "memberId": 122, "spotId": 308, "startTime": "2025-09-17 05:00", "endTime": "2025-09-17 14:00", "status": "Upcoming", "grossRevenue": 0.0 },
        { "reservationId": 420, "memberId": 122, "spotId": 309, "startTime": "2025-09-19 16:00", "endTime": "2025-09-19 23:00", "status": "Upcoming", "grossRevenue": 0.0 }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'startTime', direction: 'descending' });

    const filteredAndSortedReservations = useMemo(() => {
        let sortableItems = [...reservations];

        if (searchTerm) {
            sortableItems = sortableItems.filter(item =>
                item.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
                String(item.memberId).includes(searchTerm) ||
                String(item.spotId).includes(searchTerm)
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
    }, [reservations, searchTerm, sortConfig]);

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
                <h1 className={styles.title}>Reservations</h1>
                <div className={styles.actions}>
                    <button className={styles.button}>Filters</button>
                    <button className={`${styles.button} ${styles.primary}`}>+ Add Reservation</button>
                </div>
            </header>

            <div className={styles.content}>
                <div className={styles.searchBarContainer}>
                    <input
                        type="text"
                        placeholder="Search by status, member ID, or spot ID..."
                        className={styles.searchInput}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th onClick={() => requestSort('reservationId')}>Res ID {getSortIndicator('reservationId')}</th>
                                <th onClick={() => requestSort('memberId')}>Member ID {getSortIndicator('memberId')}</th>
                                <th onClick={() => requestSort('spotId')}>Spot ID {getSortIndicator('spotId')}</th>
                                <th onClick={() => requestSort('startTime')}>Start Time {getSortIndicator('startTime')}</th>
                                <th onClick={() => requestSort('endTime')}>End Time {getSortIndicator('endTime')}</th>
                                <th onClick={() => requestSort('status')}>Status {getSortIndicator('status')}</th>
                                <th onClick={() => requestSort('grossRevenue')}>Revenue {getSortIndicator('grossRevenue')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAndSortedReservations.map((item) => (
                                <tr key={item.reservationId}>
                                    <td>{item.reservationId}</td>
                                    <td>{item.memberId}</td>
                                    <td>{item.spotId}</td>
                                    <td>{item.startTime}</td>
                                    <td>{item.endTime}</td>
                                    <td>{item.status}</td>
                                    <td>${item.grossRevenue.toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Reservations;