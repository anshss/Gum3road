import styles from '../styles/dashboard.module.scss'
import Navbar from '../components/Navbar'
import { useState, useEffect } from 'react';
import Link from 'next/link'

export default function Dashboard(){

    const [address, setAddress] = useState('');

    useEffect(() => {
        setAddress(window.localStorage.getItem('address'));
    })

    return(
        <>
            <Navbar />
        <div className={styles.dashboard}>
            <h1 className={styles.address}> Address: {address} </h1>
            <div className={styles.btngrp}>
                <Link href='/publish'><h2>Publish</h2></Link>
                <Link href='/payout'><h2>Payout</h2></Link>
            </div>
        </div>
        </>
    )
}