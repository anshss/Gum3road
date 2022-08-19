import styles from "../styles/home.module.scss";
import Image from "next/image";

export default function Third() {
    function Card(prop) {
        return (
            <div className={styles.card}>
                <img className={styles.image} src={prop.src} width="100" height="100" alt="" />
                <h3 className={styles.heading}>{prop.heading}</h3>
                <p className={styles.content}>{prop.content}</p>
            </div>
        );
    }

    return (
        <div className={styles.third}>
            <h2>Start with anything</h2>
            <div className={styles.thirdSpace}>
                <Card src="drawing-tablet.png" heading="Art" content="" />
                <Card src="marketing.png" heading="Video" content="" />
                <Card src="headphone.png" heading="Audio" content="" />
                <Card src="marketing.png" heading="Animations" content="" />
                <Card src="creativity.png" heading="Many more" content="" />
            </div>
        </div>
    );
}
