import React, { useState, useMemo } from 'react';
import styles from './MainContent.module.css'; // We can reuse the same styles!

const Vehicles = () => {
    // Data from your Vehicles.csv file
    const [vehicles, setVehicles] = useState([
        { "memberId": 101, "vehicleId": 201, "licensePlate": "ABC 123", "make": "Toyota", "model": "Camry", "color": "Blue" },
        { "memberId": 101, "vehicleId": 202, "licensePlate": "CBA 123", "make": "Jeep", "model": "Wrangler", "color": "Black" },
        { "memberId": 102, "vehicleId": 203, "licensePlate": "XYZ 789", "make": "Honda", "model": "CR-V", "color": "Silver" },
        { "memberId": 102, "vehicleId": 204, "licensePlate": "ZYX 789", "make": "Lexus", "model": "ES 350", "color": "White" },
        { "memberId": 103, "vehicleId": 205, "licensePlate": "LMN 456", "make": "Tesla", "model": "Model 3", "color": "White" },
        { "memberId": 103, "vehicleId": 206, "licensePlate": "NML 456", "make": "Subaru", "model": "Outback", "color": "Red" },
        { "memberId": 104, "vehicleId": 207, "licensePlate": "DEF 456", "make": "Ford", "model": "F-150", "color": "Black" },
        { "memberId": 104, "vehicleId": 208, "licensePlate": "FED 456", "make": "Hyundai", "model": "Sonata", "color": "Gray" },
        { "memberId": 105, "vehicleId": 209, "licensePlate": "PQR 567", "make": "Nissan", "model": "Rogue", "color": "Red" },
        { "memberId": 105, "vehicleId": 210, "licensePlate": " RQP 567", "make": "Volkswagen", "model": "Jetta", "color": "White" },
        { "memberId": 106, "vehicleId": 211, "licensePlate": "GHI 789", "make": "Jeep", "model": "Wrangler", "color": "Green" },
        { "memberId": 107, "vehicleId": 212, "licensePlate": "JKL 012", "make": "Lexus", "model": "ES 350", "color": "Gray" },
        { "memberId": 108, "vehicleId": 213, "licensePlate": "MNO 345", "make": "Subaru", "model": "Outback", "color": "Blue" },
        { "memberId": 109, "vehicleId": 214, "licensePlate": "STU 678", "make": "Hyundai", "model": "Sonata", "color": "Silver" },
        { "memberId": 110, "vehicleId": 215, "licensePlate": "VWX 901", "make": "Volkswagen", "model": "Jetta", "color": "Black" },
        { "memberId": 111, "vehicleId": 216, "licensePlate": "YZA 234", "make": "BMW", "model": "X5", "color": "White" },
        { "memberId": 112, "vehicleId": 217, "licensePlate": "BCD 567", "make": "Audi", "model": "A4", "color": "Black" },
        { "memberId": 113, "vehicleId": 218, "licensePlate": "EFG 890", "make": "Chevrolet", "model": "Equinox", "color": "Blue" },
        { "memberId": 114, "vehicleId": 219, "licensePlate": "HIJ 123", "make": "Kia", "model": "Telluride", "color": "Gray" },
        { "memberId": 115, "vehicleId": 220, "licensePlate": "KLM 456", "make": "Dodge", "model": "Charger", "color": "Red" },
        { "memberId": 116, "vehicleId": 221, "licensePlate": "NOP 789", "make": "Mazda", "model": "CX-5", "color": "White" },
        { "memberId": 117, "vehicleId": 222, "licensePlate": "QRS 012", "make": "Ford", "model": "Explorer", "color": "Silver" },
        { "memberId": 118, "vehicleId": 223, "licensePlate": "TUV 345", "make": "Toyota", "model": "RAV4", "color": "Blue" },
        { "memberId": 119, "vehicleId": 224, "licensePlate": "WXY 678", "make": "Honda", "model": "Accord", "color": "Black" },
        { "memberId": 120, "vehicleId": 225, "licensePlate": "ZAB 901", "make": "Nissan", "model": "Altima", "color": "Red" }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'make', direction: 'ascending' });

    const filteredAndSortedVehicles = useMemo(() => {
        let sortableVehicles = [...vehicles];

        if (searchTerm) {
            sortableVehicles = sortableVehicles.filter(vehicle =>
                vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
                vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (sortConfig.key !== null) {
            sortableVehicles.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableVehicles;
    }, [vehicles, searchTerm, sortConfig]);

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
                <h1 className={styles.title}>Vehicles</h1>
                <div className={styles.actions}>
                    <button className={styles.button}>Filters</button>
                    <button className={`${styles.button} ${styles.primary}`}>+ Add Vehicle</button>
                </div>
            </header>

            <div className={styles.content}>
                <div className={styles.searchBarContainer}>
                    <input
                        type="text"
                        placeholder="Search by make, model, or license plate..."
                        className={styles.searchInput}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th onClick={() => requestSort('licensePlate')}>License Plate {getSortIndicator('licensePlate')}</th>
                                <th onClick={() => requestSort('make')}>Make {getSortIndicator('make')}</th>
                                <th onClick={() => requestSort('model')}>Model {getSortIndicator('model')}</th>
                                <th onClick={() => requestSort('color')}>Color {getSortIndicator('color')}</th>
                                <th onClick={() => requestSort('memberId')}>Member ID {getSortIndicator('memberId')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAndSortedVehicles.map((vehicle) => (
                                <tr key={vehicle.vehicleId}>
                                    <td>{vehicle.licensePlate}</td>
                                    <td>{vehicle.make}</td>
                                    <td>{vehicle.model}</td>
                                    <td>{vehicle.color}</td>
                                    <td>{vehicle.memberId}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Vehicles;