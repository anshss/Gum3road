import Login from "./Login";
import styles from "../styles/navbar.module.scss";
import Link from "next/link";

export default function Navbar() {
    return (
        <div className={styles.nav}>
        <div className={styles.logo}>
            <Link href="/">
                <h2>Gum3road</h2>
            </Link>
        </div>
            <div className={styles.rightsect}>
                <Link href="/store">
                    <h3>Store</h3>
                </Link>
                <Link href="/publish">
                    <h3>Dashboard</h3>
                </Link>
                <Login />
            </div>
        </div>
    );
}
