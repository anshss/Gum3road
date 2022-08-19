import styles from "../styles/home.module.scss";

export default function Second() {
    return (
        <div className={styles.second}>
            <h2>This is all you need to get started</h2>
            <div className={styles.boxSpace}>
                <div className={styles.box}>
                    <p>Go to Dashboard and publish your first product now!</p>
                </div>
                <div className={styles.box}>
                    <p>Connect any wallet of your choice!</p>
                    <img className={styles.image} src="payment.png" width="100" height="100" alt="" />
                </div>
                <div className={styles.box}>
                    <p>
                        Set supply, price, file and a cover image for your new nft!
                    </p>
                </div>
                <div className={styles.box}>
                    <p>
                        Purchase a an asset from store and download its
                        associated file
                    </p>
                </div>
            </div>
        </div>
    );
}
