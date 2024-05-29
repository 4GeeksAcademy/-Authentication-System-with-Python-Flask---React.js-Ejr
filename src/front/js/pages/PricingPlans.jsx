import React from 'react';
import styles from './PricingPlans.module.css';

const PricingContainer = () => {
    return (
        <div className={styles.pricingContainer}>
            {/* Card 1 */}
            <div className={`${styles.pricingCard} ${styles.pricingCardBasic}`}>
                <h4 className={styles.pricingCardTitle}>Basic</h4>
                <div className={styles.pricingCardPrice}>$9.99</div>
                <div className={styles.pricingCardDetails}>
                    <ul>
                        <li>Feature 1</li>
                        <li>Feature 2</li>
                        <li>Feature 3</li>
                    </ul>
                </div>
                <a className={styles.enroll} href="#">Choose Basic</a>
            </div>

            {/* Card 2 */}
            <div className={`${styles.pricingCard} ${styles.pricingCardStandard}`}>
                <h4 className={styles.pricingCardTitle}>Standard</h4>
                <div className={styles.pricingCardPrice}>$19.99</div>
                <div className={styles.pricingCardDetails}>
                    <ul>
                        <li>Feature 1</li>
                        <li>Feature 2</li>
                        <li>Feature 3</li>
                        <li>Feature 4</li>
                        <li>Feature 5</li>
                    </ul>
                </div>
                <a className={styles.enroll} href="#">Choose Standard</a>
            </div>

            {/* Card 3 */}
            <div className={`${styles.pricingCard} ${styles.pricingCardPrimary}`}>
                <h4 className={styles.pricingCardBanner}>Most Popular</h4>
                <hr />
                <h3>PRO</h3>
                <div className={styles.pricingCardPriceOriginal}>
                    <s>$129.00</s>
                </div>
                <div className={styles.pricingCardPrice}>$99.99</div>
                <div className={styles.pricingCardDetails}>
                    <ul>
                        <li>More blab</li>
                        <li>More blabh</li>
                        <li>More blabh</li>
                        <li>More blabh</li>
                    </ul>
                </div>
                <a className={styles.enroll} href="#">Choose Pro</a>
            </div>
        </div>
    );
};

export default PricingContainer;