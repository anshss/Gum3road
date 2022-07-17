import Head from 'next/head';
import styles from '../styles/home.module.scss';
import Navbar from '../components/Navbar'
import First from '../components/First';

export default function Home() {
    return(
        <div>
            <Navbar/>
            <First />
        </div>
    )
}