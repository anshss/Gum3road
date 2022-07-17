import Head from 'next/head';
import styles from '../styles/home.module.scss';
import Navbar from '../components/Navbar'
import First from '../components/First';
import Second from '../components/Second';
import Footer from '../components/Footer';

export default function Home() {
    return(
        <div>
            <Navbar/>
            <First />
            <Second />
            <Footer />
        </div>
    )
}