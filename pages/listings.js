import Dashboard from "../components/Dashboard";
import styles from "../styles/dashboard.module.scss";
import { useState } from "react";
import Card from '../components/Card'

export default function Inventory() {
    const[nfts, setNfts] = useState([
        {
            name: 'ss',
            price: 1,
            supply: 22,
            tokenId: 1,
            img: './ebook2.png'
        },
        {
            name: 'aa',
            price: 5,
            supply: 98,
            tokenId: 2,
            img: './vercel.svg'
        },
        {
            name: 'ss',
            price: 1,
            supply: 22,
            tokenId: 3,
            img: './1124787.jpg'
        },
        {
            name: 'aa',
            price: 5,
            supply: 98,
            tokenId: 4,
            img: './peakpx.jpg'
        },
        {
            name: 'aa',
            price: 5,
            supply: 98,
            tokenId: 4,
            img: './peakpx.jpg'
        }
    ]);

    console.log(nfts[2].name);

    return (
        <>
            <Dashboard />
            <div className={styles.inventory}>
                <h2>You have listed {nfts.length} eBooks</h2>
            </div>
            <div>
                {nfts.map((nft, i) =>
                <Card key={i} img={nft.img} name={nft.name} price= {nft.price} supplyleft={nft.supply} tokenId={nft.tokenId}/>
                )}
            </div>
        </>
    );
}
