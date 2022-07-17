import styles from '../styles/dashboard.module.scss'
import Navbar from '../components/Navbar'

export default function Dashboard(){

    // const [address, setAddress] = useState();
    // setAddress(window.localStorage.getItem('address'));

    return(
        <div className={styles.dashboard}>
            <Navbar />
            <h2 id="address"></h2>
            {/* <h2></h2> */}
            dashboard
        </div>
    )
}