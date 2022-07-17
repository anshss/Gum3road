import styles from '../styles/home.module.scss';
import Illustration from '../public/ebook.jpg'
import Link from 'next/link'
export default function First(){
    return(
        <div className={styles.first}>
        <section>
            <h1>Go from zero to $1</h1>
            <p>With Gum3road, anyone can earn their first dollar online. Just start with what you know, see what sticks, and get paid. It's easy.</p>
            <Link href='/store'><button className={styles.btn}>Store</button></Link>
        </section>
        <sidebar>
            {/* {Illustration} */}
        </sidebar>
        </div>
    )
}
