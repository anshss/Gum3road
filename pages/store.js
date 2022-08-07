import styles from '../styles/store.module.scss'
import Navbar from "../components/Navbar";
import Card from '../components/Card'
import { useEffect, useState } from 'react';
import web3modal from 'web3modal'
import { ethers } from 'ethers'
import axios from 'axios';
import { contractAddress } from "../config.js"
import Gum3road from '../artifacts/contracts/Gum3road.sol/Gum3road.json'

export default function Store() {
    const[books, setBooks] = useState([
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
            name: 'ss',
            price: 1,
            supply: 22,
            tokenId: 5,
            img: './hd-jujutsu-kaisen-wallpaper-whatspaper-8.jpg'
        },
        {
            name: 'aa',
            price: 5,
            supply: 98,
            tokenId: 6,
            img: './peakpx(1).jpg'
        },
        {
            name: 'ss',
            price: 1,
            supply: 22,
            tokenId: 7,
            img: './peakp(2).jpg'
        },
        {
            name: 'aa',
            price: 5,
            supply: 98,
            tokenId: 8,
            img: './vercel.svg'
        }
    ]);

    const [testing, setTesting] = useState()


    const[loaded, setLoaded] = useState(false)

    useEffect(() => {
        loadEbooks()
    }, [])

    async function loadEbooks(){
        const modal = new web3modal()
        const connection = await modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, Gum3road.abi, signer)
        const data = await contract.fetchStore();
        const books = await Promise.all(data.map(async i => {
            const tokenURI = await contract.tokenURI(i.tokenId)
            const meta = await axios.get(tokenURI)
            let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
            let book = {
                price,
                name: meta.data.name,
                tokenId: i.tokenId.toNumber(),
                creator: i.creator,
                supplyLeft: i.supplyLeft,
                cover: meta.data.cover,
                file: meta.data.file,
            }
            return book
        }));
        setTesting(books);
        setLoaded(true);

    }
    
    function conso(){
        
        console.log(testing)
    }




    return (
        <>
            <div className={styles.store}>
                {books.map((book, i) =>
                <Card key={i} img={book.cover} name={book.name} price= {book.price} supplyLeft={book.supplyLeft} tokenId={book.tokenId}/>
                )}
            </div>
        </>
    );
}


