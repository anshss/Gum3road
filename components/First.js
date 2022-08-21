import styles from "../styles/home.module.scss";
import Link from "next/link";
import Image from "next/image";

export default function First() {
    return (
        <div className={styles.first}>
            <div className={styles.nestDiv}>
                <section>
                    <h1>Mint anything to earn your $1 </h1>
                    <p>
                        A place where you can mint any file as ERC1155 nft. Now
                        you can sell the digital services you want—books,
                        audio, courses, and more—right to your audience as a digital asset.
                    </p>
                    <Link href="/store">
                        <button className={styles.btn}>Store</button>
                    </Link>
                </section>
                <sidebar className={styles.sidebar}>
                <a href="https://storyset.com/online"><Image src="/uploading.svg" width={400} height={400} alt=""/></a>
                </sidebar>
            </div>
        </div>
    );
}
