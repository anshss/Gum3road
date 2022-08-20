import Login from "./Login";
import styles from "../styles/navbar.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Navbar() {
    const router = useRouter();
    const currentRoute = router.pathname;

    return (
        <div className={styles.nav}>
            <div className={styles.logo}>
                <Link href="/">
                    <h2>Gum3road</h2>
                </Link>
            </div>
            <div className={styles.rightDiv}>
                <Link href="/store">
                    <a className={
                            currentRoute === "/store" ? styles.active : ""
                        }
                    >
                        <h3>Store</h3>
                    </a>
                </Link>
                <Link href="/publish">
                    <a className={
                            currentRoute === "/publish" ? styles.active : ""
                        }
                    >
                        <h3>Dashboard</h3>
                    </a>
                </Link>
                <Login />
            </div>
        </div>
    );
}
