import styles from '../styles/home.module.scss'
import Link from 'next/link'
import Image from 'next/image'

export default function First(){
    return(
        <div className={styles.first}>
        <section>
            <h1>Go from zero to $1</h1>
            <p>With Gum3road, anyone can earn their first dollar online. Just start with what you know, see what sticks, and get paid. It&apos;s easy.</p>
            <Link href='/store'><button className={styles.btn}>Store</button></Link>
        </section>
        <sidebar>
            {/* <Image src="/ebooks2.png" width={520} height={520} /> */}
        </sidebar>
        </div>
    )
}
