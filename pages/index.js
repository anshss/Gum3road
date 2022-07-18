import Head from 'next/head';
import styles from '../styles/home.module.scss';
import Navbar from '../components/Navbar'
import First from '../components/First';
import Second from '../components/Second';
import Footer from '../components/Footer';
import Third from '../components/Third';

export default function Home() {
    return(
        <div>
            <Navbar/>
            <First />
            <Second />
            <Third />
            <Footer />
        </div>
    )
}