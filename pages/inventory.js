import Dashboard from "../components/dashboard";
import styles from "../styles/dashboard.module.scss";
import { useState } from "react";

export default function Inventory() {
    const [eBooks, seteBooks] = useState(0);

    return (
        <>
            <Dashboard />
            <div className={styles.inventory}>
                <h2>You own {eBooks} eBooks</h2>
            </div>
        </>
    );
}
