import styles from '../styles/dashboard.module.scss'
import Navbar from '../components/Navbar'

export default function Dashboard(){
    return(
        <div className={styles.dashboard}>
            <Navbar />
            <h2>Address: 0xx</h2>
            dashboard
        </div>
    )
}