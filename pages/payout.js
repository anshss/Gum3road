import Dashboard from "./dashboard";
import styles from "../styles/dashboard.module.scss";
import { useState } from "react";

export default function Payout() {
    const [Earnings, setEarnings] = useState(0);
    const [ItemsSold, setItemsSold] = useState(0);

    return (
        <>
            <Dashboard />
            <div className={styles.payout}>
                <h2>Total Earned: ${Earnings}</h2>
                <h2>Total ebooks sold: {ItemsSold}</h2>
            </div>
        </>
    );
}
