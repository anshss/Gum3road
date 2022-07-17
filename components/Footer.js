import styles from '../styles/home.module.scss'

export default function Footer(){
    return(
        <div className={styles.footer}>
            <h1>Gum3road</h1>
            <div className={styles.mails}>
                <p>anshspvt@gmail.com</p>
                <p>thisguy@gmail.com</p>
            </div>
            <div></div>
        </div>
    )
}