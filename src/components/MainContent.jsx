import React, { useState, useMemo } from 'react';
import styles from './MainContent.module.css'; // Import the CSS module

const MainContent = () => {
    // The full, original list of members is now in state
    const [members, setMembers] = useState([
        { memberId: 101, fullName: 'John Doe', email: 'john.doe@email.com', phoneNumber: '555-0101', unitNumber: 'Unit 1', role: 'Resident', createdDate: '2025-01-02' },
        { memberId: 102, fullName: 'Jane Smith', email: 'jane.smith@email.com', phoneNumber: '555-0102', unitNumber: 'Unit 2', role: 'Resident', createdDate: '2025-01-03' },
        { memberId: 103, fullName: 'Alice Johnson', email: 'alice.j@email.com', phoneNumber: '555-0103', unitNumber: 'Unit 3', role: 'Resident', createdDate: '2025-01-04' },
        { memberId: 104, fullName: 'Bob Williams', email: 'bob.w@email.com', phoneNumber: '555-0104', unitNumber: 'Unit 4', role: 'Resident', createdDate: '2025-01-05' },
        { memberId: 105, fullName: 'Charlie Brown', email: 'charlie.b@email.com', phoneNumber: '555-0105', unitNumber: 'Unit 5', role: 'Resident', createdDate: '2025-01-06' },
        { memberId: 106, fullName: 'Diana Prince', email: 'diana.p@email.com', phoneNumber: '555-0106', unitNumber: 'Unit 6', role: 'Resident', createdDate: '2025-01-07' },
        { memberId: 107, fullName: 'Ethan Hunt', email: 'ethan.h@email.com', phoneNumber: '555-0107', unitNumber: 'Unit 7', role: 'Resident', createdDate: '2025-01-08' },
        { memberId: 108, fullName: 'Fiona Glenanne', email: 'fiona.g@email.com', phoneNumber: '555-0108', unitNumber: 'Unit 8', role: 'Resident', createdDate: '2025-01-09' },
        { memberId: 109, fullName: 'George Costanza', email: 'george.c@email.com', phoneNumber: '555-0109', unitNumber: 'Unit 9', role: 'Resident', createdDate: '2025-01-10' },
        { memberId: 110, fullName: 'Hannah Abbott', email: 'hannah.a@email.com', phoneNumber: '555-0110', unitNumber: 'Unit 10', role: 'Resident', createdDate: '2025-01-11' },
        { memberId: 111, fullName: 'Ian Malcolm', email: 'ian.m@email.com', phoneNumber: '555-0111', unitNumber: 'Unit 11', role: 'Resident', createdDate: '2025-01-12' },
        { memberId: 112, fullName: 'Jessica Jones', email: 'jessica.j@email.com', phoneNumber: '555-0112', unitNumber: 'Unit 12', role: 'Resident', createdDate: '2025-01-13' },
        { memberId: 113, fullName: 'Kevin McCallister', email: 'kevin.m@email.com', phoneNumber: '555-0113', unitNumber: 'Unit 13', role: 'Resident', createdDate: '2025-01-14' },
        { memberId: 114, fullName: 'Laura Palmer', email: 'laura.p@email.com', phoneNumber: '555-0114', unitNumber: 'Unit 14', role: 'Resident', createdDate: '2025-01-15' },
        { memberId: 115, fullName: 'Michael Scott', email: 'michael.s@email.com', phoneNumber: '555-0115', unitNumber: 'Unit 15', role: 'Resident', createdDate: '2025-01-16' },
        { memberId: 116, fullName: 'Nancy Wheeler', email: 'nancy.w@email.com', phoneNumber: '555-0116', unitNumber: 'Unit 16', role: 'Resident', createdDate: '2025-01-17' },
        { memberId: 117, fullName: 'Oscar Martinez', email: 'oscar.m@email.com', phoneNumber: '555-0117', unitNumber: 'Unit 17', role: 'Resident', createdDate: '2025-01-18' },
        { memberId: 118, fullName: 'Pam Beesly', email: 'pam.b@email.com', phoneNumber: '555-0118', unitNumber: 'Security Room', role: 'Staff', createdDate: '2025-01-19' },
        { memberId: 119, fullName: 'Quentin Coldwater', email: 'quentin.c@email.com', phoneNumber: '555-0119', unitNumber: 'Manager Office', role: 'Staff', createdDate: '2025-01-20' },
        { memberId: 120, fullName: 'Rachel Green', email: 'rachel.g@email.com', phoneNumber: '555-0120', unitNumber: 'Manager Office', role: 'Staff', createdDate: '2025-01-21' }
]);

    const [searchTerm, setSearchTerm] = useState('');
    const [sortConfig, setSortConfig] = useState({ key: 'fullName', direction: 'ascending' });

    // useMemo will re-calculate the filtered/sorted members only when the data changes
    const filteredAndSortedMembers = useMemo(() => {
        let sortableMembers = [...members];

        // Filter logic
        if (searchTerm) {
            sortableMembers = sortableMembers.filter(member =>
                member.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                member.role.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Sort logic
        if (sortConfig.key !== null) {
            sortableMembers.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableMembers;
    }, [members, searchTerm, sortConfig]);

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
                <h1 className={styles.title}>Members</h1>
                <div className={styles.actions}>
                    <button className={styles.button}>Filters</button>
                    <button className={`${styles.button} ${styles.primary}`}>+ Invite</button>
                </div>
            </header>

            <div className={styles.content}>
                <div className={styles.searchBarContainer}>
                    <input
                        type="text"
                        placeholder="Search by name, email, or role..."
                        className={styles.searchInput}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th onClick={() => requestSort('memberId')}>Member ID {getSortIndicator('memberId')}</th>
                                <th onClick={() => requestSort('fullName')}>Full Name {getSortIndicator('fullName')}</th>
                                <th onClick={() => requestSort('email')}>Email {getSortIndicator('email')}</th>
                                <th onClick={() => requestSort('phoneNumber')}>Phone Number {getSortIndicator('phoneNumber')}</th>
                                <th onClick={() => requestSort('unitNumber')}>Unit {getSortIndicator('unitNumber')}</th>
                                <th onClick={() => requestSort('role')}>Role {getSortIndicator('role')}</th>
                                <th onClick={() => requestSort('createdDate')}>Created Date {getSortIndicator('createdDate')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAndSortedMembers.map((member) => (
                                <tr key={member.memberId}>
                                    <td>{member.memberId}</td>
                                    <td>{member.fullName}</td>
                                    <td>{member.email}</td>
                                    <td>{member.phoneNumber}</td>
                                    <td>{member.unitNumber}</td>
                                    <td>{member.role}</td>
                                    <td>{member.createdDate}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MainContent;

