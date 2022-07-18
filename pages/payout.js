import Dashboard from "../components/dashboard";
import styles from "../styles/dashboard.module.scss";
import { useState } from "react";

export default function Payout() {
    const [Earnings, setEarnings] = useState(0);
    const [ItemsSold, setItemsSold] = useState(0);

    return (
        <>
            <Dashboard />
            <div className={styles.payout}>
                <h2>Payout earned:&nbsp;&nbsp;💵{Earnings}</h2>
                <h2>Ebooks purchased:&nbsp;&nbsp;📘{ItemsSold}</h2>
            </div>
        </>
    );
}
