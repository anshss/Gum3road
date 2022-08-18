import Dashboard from "../components/Dashboard";
import styles from "../styles/dashboard.module.scss";
import { useEffect, useState } from "react";
import web3modal from "web3modal";
import { ethers } from "ethers";
import axios from "axios";
import { contractAddress } from "../address.js";
import { saveAs } from "file-saver";
import Gum3road from "../artifacts/contracts/Gum3road.sol/Gum3road.json";
// import Card from '../components/Card'

export default function Inventory() {

    const [myBooks, setMyBooks] = useState([]);

    const [loaded, setLoaded] = useState(false);

    const ipfsGateway = "https://anshs-gum3road.infura-ipfs.io/ipfs/";

    useEffect(() => {
        myAssets();
    }, []);

    async function myAssets() {
        const modal = new web3modal();
        const connection = await modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const contract = new ethers.Contract(
            contractAddress,
            Gum3road.abi,
            provider
        );
        const data = await contract.fetchInventory();

        console.log(data)
        const books = await Promise.all(
            data.map(async (i) => {
                const tokenUri = await contract.uri(i.tokenId.toString());
                const trimUri = await tokenUri.substring(
                    tokenUri.lastIndexOf("/") + 1
                );
                const meta = await axios.get(`${ipfsGateway}${trimUri}`);
                let price = ethers.utils.formatEther(i.price);
                const coverD = await meta.data.cover.substring(
                    meta.data.cover.lastIndexOf("/") + 1
                );
                const fileD = await meta.data.file.substring(
                    meta.data.cover.lastIndexOf("/") + 1
                );
                let book = {
                    price,
                    name: meta.data.name,
                    tokenId: i.tokenId.toNumber(),
                    creator: i.creator,
                    supplyL: i.supplyleft.toNumber(),
                    cover: `${ipfsGateway}${coverD}`,
                    file: `${ipfsGateway}${fileD}`,
                };
                return book;
            })
        );
        setMyBooks(books);
        setLoaded(true);
    }

    async function Download(book) {
        const fileUrl = book.file;
        const name = book.name;
        console.log(fileUrl);
        saveAs(fileUrl, name);
    }

    function Card(prop) {
        return (
            <div className={styles.card}>
                <div className={styles.imgDiv}>
                    <img src={prop.cover} alt="" />
                </div>
                <div className={styles.detailsDiv}>
                    <div className={styles.nestedDiv}>
                        <p>Name: &nbsp;{prop.name}</p>
                        <p>Remaining: &nbsp;{prop.supplyL}</p>
                    </div>
                    <div className={styles.nestedDiv}>
                        <p>Price: &nbsp;{prop.price} Matic</p>
                        <p>Token Id: &nbsp;{prop.tokenId}</p>
                    </div>
                </div>
                <div className={styles.buyDiv} onClick={() => Download(prop)}>
                    <p>Download</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <Dashboard />
            <div className={styles.inventory}>
                <h2>You own {myBooks.length} eBooks</h2>
                <div className={styles.subinventory}>
                    {myBooks.map((book, i) => (
                        <Card
                            key={i}
                            cover={book.cover}
                            name={book.name}
                            price={book.price}
                            supplyL={book.supplyL}
                            tokenId={book.tokenId}
                            creator={book.creator}
                            file={book.file}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
