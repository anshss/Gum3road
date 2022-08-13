import styles from '../styles/store.module.scss'
// import Card from '../components/Card'
import { useEffect, useState } from 'react';
import web3modal from 'web3modal'
import { ethers } from 'ethers'
import axios from 'axios';
import { contractAddress } from "../address.js"
import Gum3road from '../artifacts/contracts/Gum3road.sol/Gum3road.json'

export default function Store() {
    const[tests, setTests] = useState([
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

    const [books, setBooks] = useState([])

    const [te, setTe] = useState([])


    const[loaded, setLoaded] = useState(false)

    useEffect(() => {
        loadEbooks()
    }, [])

    async function loadEbooks(){
        const modal = new web3modal()
        const connection = await modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const contract = new ethers.Contract(contractAddress, Gum3road.abi, provider)
        const data = await contract.fetchStore();

        const books = await Promise.all(data.map(async i => {  //when the array of promises is resolved then map over each promise
            const tokenUri = await contract.uri(i.tokenId).then(console.log(tokenUri))
            const meta = await axios.get(tokenUri)
            // console.log('meta: ',i.tokenId.toNumber(), tokenUri)
            let price = ethers.utils.formatEther(i.price)
            let book = {
                price,
                name: meta.data.name,
                tokenId: i.tokenId.toNumber(),
                creator: i.creator,
                supplyL: i.supplyleft.toNumber(),
                cover: meta.data.cover,
                file: meta.data.file,
            }
            return book
        }));
        setBooks(books);
        setLoaded(true);
    }

    async function buyBooks(book) {
        const modal = new web3modal()
        const connection = await modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress, Gum3road.abi, signer)
        const price = ethers.utils.parseUnits(book.price.toString(), 'ether')
        const transaction = await contract.createSale(book.tokenId, {value: price, gasLimit: 800000})
        await transaction.wait()
        loadEbooks()
    }

    function conso(){
        console.log(te)
    }

    function Card(prop) {
        return (
            <div className={styles.card}>
                <div className={styles.imgDiv}>
                    <img src={prop.img} alt="" />
                </div>
                <div className={styles.detailsDiv}>
                    <p>Name: {prop.name}</p>
                    <p>Price: {prop.price} Matic</p>
                    <p>Supply Left: {prop.supplyL}</p>
                    <p>Token Id: {prop.tokenId}</p>
                    <h6>Creator: {prop.creator}</h6>
                </div>
                <div className={styles.buyDiv} onClick={() => buyBooks(prop)}><p>Buy Now</p></div>
            </div>
        );
    }

    return (
        <>
            <div className={styles.store}>
                {books.map((book, i) =>
                <Card key={i} img={book.cover} name={book.name} price= {book.price} supplyL={book.supplyL} tokenId={book.tokenId} creator={book.creator}/>
                )}
            </div>
            <button onClick={conso}>Click me </button>
        </>
    );
}


