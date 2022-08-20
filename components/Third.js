import styles from "../styles/home.module.scss";

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
                <Card src="drawing-tablet.png" heading="Art" content="From paint brushes to your own arts, sell anything!" />
                <Card src="marketing.png" heading="Video" content="Earn your way up through video lectures and courses." />
                <Card src="headphone.png" heading="Audio" content="Tracks, beats, or any type of audio for your project." />
                <Card src="marketing.png" heading="Animations" content="Grow with this fast moving industry with our community." />
                <Card src="creativity.png" heading="Many more" content="List just doesn't end here! Sell literally ANYTHING !" />
            </div>
        </div>
    );
}
