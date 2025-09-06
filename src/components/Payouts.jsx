import React, { useState, useMemo } from 'react';
import styles from './Payouts.module.css'; // We will create this file in the next step

const Payouts = () => {
    // Data from your Payouts.csv file
    const [payouts, setPayouts] = useState([
        {"payoutId": 601, "payoutDate": "2024-02-01", "periodStart": "2024-01-01", "periodEnd": "2024-01-31", "grossRevenue": 2130, "serviceFees": 300, "netPayout": 1830, "status": "Received"},
        {"payoutId": 602, "payoutDate": "2024-03-01", "periodStart": "2024-02-01", "periodEnd": "2024-02-28", "grossRevenue": 1925, "serviceFees": 300, "netPayout": 1625, "status": "Received"},
        {"payoutId": 603, "payoutDate": "2024-04-01", "periodStart": "2024-03-01", "periodEnd": "2024-03-31", "grossRevenue": 1820, "serviceFees": 300, "netPayout": 1520, "status": "Received"},
        {"payoutId": 604, "payoutDate": "2024-05-01", "periodStart": "2024-04-01", "periodEnd": "2024-04-30", "grossRevenue": 1620, "serviceFees": 300, "netPayout": 1320, "status": "Received"},
        {"payoutId": 605, "payoutDate": "2024-06-01", "periodStart": "2024-05-01", "periodEnd": "2024-05-31", "grossRevenue": 2770, "serviceFees": 500, "netPayout": 2270, "status": "Received"},
        {"payoutId": 606, "payoutDate": "2024-07-01", "periodStart": "2024-06-01", "periodEnd": "2024-06-30", "grossRevenue": 2425, "serviceFees": 500, "netPayout": 1925, "status": "Received"},
        {"payoutId": 607, "payoutDate": "2024-08-01", "periodStart": "2024-07-01", "periodEnd": "2024-07-31", "grossRevenue": 2340, "serviceFees": 500, "netPayout": 1840, "status": "Received"},
        {"payoutId": 608, "payoutDate": "2024-09-01", "periodStart": "2024-08-01", "periodEnd": "2024-08-31", "grossRevenue": 2240, "serviceFees": 500, "netPayout": 1740, "status": "Received"},
        {"payoutId": 609, "payoutDate": "2024-10-01", "periodStart": "2024-09-01", "periodEnd": "2024-09-30", "grossRevenue": 2420, "serviceFees": 500, "netPayout": 1920, "status": "Received"},
        {"payoutId": 610, "payoutDate": "2024-11-01", "periodStart": "2024-10-01", "periodEnd": "2024-10-31", "grossRevenue": 2220, "serviceFees": 500, "netPayout": 1720, "status": "Received"},
        {"payoutId": 611, "payoutDate": "2024-12-01", "periodStart": "2024-11-01", "periodEnd": "2024-11-30", "grossRevenue": 2770, "serviceFees": 500, "netPayout": 2270, "status": "Received"},
        {"payoutId": 612, "payoutDate": "2025-01-01", "periodStart": "2024-12-01", "periodEnd": "2024-12-31", "grossRevenue": 1975, "serviceFees": 500, "netPayout": 1475, "status": "Received"},
        {"payoutId": 613, "payoutDate": "2025-02-01", "periodStart": "2025-01-01", "periodEnd": "2025-01-31", "grossRevenue": 1890, "serviceFees": 500, "netPayout": 1390, "status": "Received"},
        {"payoutId": 614, "payoutDate": "2025-03-01", "periodStart": "2025-02-01", "periodEnd": "2025-02-28", "grossRevenue": 1790, "serviceFees": 500, "netPayout": 1290, "status": "Received"},
        {"payoutId": 615, "payoutDate": "2025-04-01", "periodStart": "2025-03-01", "periodEnd": "2025-03-31", "grossRevenue": 2225, "serviceFees": 500, "netPayout": 1725, "status": "Received"},
        {"payoutId": 616, "payoutDate": "2025-05-01", "periodStart": "2025-04-01", "periodEnd": "2024-04-30", "grossRevenue": 2140, "serviceFees": 500, "netPayout": 1640, "status": "Received"},
        {"payoutId": 617, "payoutDate": "2025-06-01", "periodStart": "2025-05-01", "periodEnd": "2025-05-31", "grossRevenue": 2040, "serviceFees": 500, "netPayout": 1540, "status": "Received"},
        {"payoutId": 618, "payoutDate": "2025-07-01", "periodStart": "2025-06-01", "periodEnd": "2025-06-30", "grossRevenue": 2220, "serviceFees": 500, "netPayout": 1720, "status": "Received"},
        {"payoutId": 619, "payoutDate": "2025-08-01", "periodStart": "2025-07-01", "periodEnd": "2025-07-31", "grossRevenue": 2020, "serviceFees": 600, "netPayout": 1420, "status": "Received"},
        {"payoutId": 620, "payoutDate": "2025-09-01", "periodStart": "2025-08-01", "periodEnd": "2025-08-31", "grossRevenue": 2400, "serviceFees": 600, "netPayout": 1800, "status": "Received"}
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'payoutDate', direction: 'descending' });

    const filteredAndSortedPayouts = useMemo(() => {
        let sortableItems = [...payouts];
        if (searchTerm) {
            sortableItems = sortableItems.filter(item =>
                item.status.toLowerCase().includes(searchTerm.toLowerCase())
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
    }, [payouts, searchTerm, sortConfig]);

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
                <h1 className={styles.title}>Payouts</h1>
                <div className={styles.actions}>
                    <button className={styles.button}>Filters</button>
                    <button className={`${styles.button} ${styles.primary}`}>Export Report</button>
                </div>
            </header>

            <div className={styles.content}>
                <div className={styles.searchBarContainer}>
                    <input
                        type="text"
                        placeholder="Search by status (e.g., Paid)..."
                        className={styles.searchInput}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th onClick={() => requestSort('payoutDate')}>Payout Date {getSortIndicator('payoutDate')}</th>
                                <th onClick={() => requestSort('status')}>Status {getSortIndicator('status')}</th>
                                <th onClick={() => requestSort('netPayout')}>Net Payout {getSortIndicator('netPayout')}</th>
                                <th onClick={() => requestSort('grossRevenue')}>Gross Revenue {getSortIndicator('grossRevenue')}</th>
                                <th onClick={() => requestSort('serviceFees')}>Service Fees {getSortIndicator('serviceFees')}</th>
                                <th onClick={() => requestSort('periodStart')}>Period {getSortIndicator('periodStart')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAndSortedPayouts.map((item) => (
                                <tr key={item.payoutId}>
                                    <td>{item.payoutDate}</td>
                                    <td>{item.status}</td>
                                    <td>${item.netPayout.toFixed(2)}</td>
                                    <td>${item.grossRevenue.toFixed(2)}</td>
                                    <td>${item.serviceFees.toFixed(2)}</td>
                                    <td>{item.periodStart} - {item.periodEnd}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};
export default Payouts;