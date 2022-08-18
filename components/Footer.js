import styles from '../styles/home.module.scss'
import Link from 'next/link'
import EmailIcon from '@mui/icons-material/Email';

export default function Footer(){
    return(
        <div className={styles.footer}>
            <h1>Gum3road</h1>
            <div className={styles.mails}>
                {/* <Link href="mailto:anshspvt@gmail.com"><p><img src="mail(24x24)@2x.png" /><span>&nbsp;anshspvt@gmail.com</span></p></Link> */}
                <Link href="mailto:anshspvt@gmail.com"><p><EmailIcon />&nbsp;&nbsp;anshspvt@gmail.com</p></Link>
            </div>
            <div></div>
        </div>
    )
}