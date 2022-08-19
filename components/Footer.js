import styles from "../styles/home.module.scss";
import Link from "next/link";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function Footer() {
    return (
        <div className={styles.footer}>
            <h1>Gum3road</h1>
            <div className={styles.mails}>
                <EmailIcon />
                <Link href="mailto:anshspvt@gmail.com">
                    <p>&nbsp;&nbsp;anshspvt@gmail.com</p>
                </Link>
            </div>
            <div>
                <GitHubIcon />
                <Link href="https://github.com/anshss/PolygonBUIDLIT">
                    <p>&nbsp;&nbsp;Code</p>
                </Link>
            </div>
        </div>
    );
}
