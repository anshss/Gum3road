import styles from "../styles/dashboard.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Dashboard() {
    const router = useRouter();
    const currentRoute = router.pathname;

    return (
        <>
            <div className={styles.dashboard}>
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
