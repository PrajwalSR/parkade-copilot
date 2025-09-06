import React from 'react';
import styles from './Pricing.module.css'; // We will create this file next

const Pricing = () => {
    // Data from your Fees_Pricing_Sheet.csv file
    const pricingTiers = [
        { feeType: 'Overstay', amountPerHour: 20, amountPerDay: 60, amountPerMonth: 0 },
        { feeType: 'Regular', amountPerHour: 5, amountPerDay: 40, amountPerMonth: 200 },
        { feeType: 'Upcoming', amountPerHour: 0, amountPerDay: 0, amountPerMonth: 0 }
    ];

    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>
                <h1 className={styles.title}>Fee Pricing</h1>
                <div className={styles.actions}>
                    <button className={`${styles.button} ${styles.primary}`}>Edit Rates</button>
                </div>
            </header>

            <div className={styles.content}>
                <div className={styles.tableContainer}>
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>Fee Type</th>
                                <th>Amount / Hour</th>
                                <th>Amount / Day</th>
                                <th>Amount / Month</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pricingTiers.map((tier) => (
                                <tr key={tier.feeType}>
                                    <td>{tier.feeType}</td>
                                    <td>{tier.amountPerHour !== null ? `$${tier.amountPerHour.toFixed(2)}` : '-'}</td>
                                    <td>{tier.amountPerDay !== null ? `$${tier.amountPerDay.toFixed(2)}` : '-'}</td>
                                    <td>{tier.amountPerMonth !== null ? `$${tier.amountPerMonth.toFixed(2)}` : '-'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Pricing;