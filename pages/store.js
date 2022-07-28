import styles from '../styles/store.module.scss'
import Navbar from "../components/Navbar";
import Card from '../components/Card'

export default function Store() {
    return (
        <>
            <div className={styles.store}>
                store
                <Card />
            </div>
        </>
    );
}
