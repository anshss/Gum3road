import styles from "../styles/dashboard.module.scss";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Dashboard() {
    const router = useRouter();
    const currentRoute = router.pathname;

    const [address, setAddress] = useState("");

    useEffect(() => {
        setAddress(window.localStorage.getItem("address"));
    }, []);

    return (
        <>
            <div className={styles.dashboard}>
                {/* <h1 className={styles.address}> Address: {address} </h1> */}
                <div className={styles.btngrp}>
                    <Link href="/publish">
                        <a
                            className={
                                currentRoute === "/publish" ? styles.active : ""
                            }
                        >
                            <h2>Publish</h2>
                        </a>
                    </Link>
                    <Link href="/listings">
                    <a
                            className={
                                currentRoute === "/listings" ? styles.active : ""
                            }
                        >
                        <h2>Listings</h2>
                        </a>
                    </Link>
                    <Link href="/inventory">
                    <a
                            className={
                                currentRoute === "/inventory" ? styles.active : ""
                            }
                        >
                        <h2>Inventory</h2>
                        </a>
                    </Link>
                </div>
            </div>
        </>
    );
}
