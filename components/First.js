import styles from "../styles/home.module.scss";
import Link from "next/link";
import Image from "next/image";

export default function First() {
    return (
        <div className={styles.first}>
            <div className={styles.mainf}>
                <section>
                    <h1>Go from zero to $1 </h1>
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
                    <Image src="/Uploading-rafiki.png" width={400} height={400} alt=""/>
                </sidebar>
            </div>
        </div>
    );
}
