import Dashboard from "../components/Dashboard";
import styles from "../styles/dashboard.module.scss";
import { useEffect, useState } from "react";
import web3modal from "web3modal";
import { ethers } from "ethers";
import axios from "axios";
import { contractAddress } from "../address.js";
import { saveAs } from "file-saver";
import Gum3road from "../artifacts/contracts/Gum3road.sol/Gum3road.json";

export default function Inventory() {
    const [myBooks, setMyBooks] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        myAssets();
    }, []);

    async function myAssets() {
        const modal = new web3modal({
            network: "mumbai",
            cacheProvider: true,
        });
        const connection = await modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
            contractAddress,
            Gum3road.abi,
            signer
        );
        const data = await contract.fetchInventory();

        console.log(data);
        const books = await Promise.all(
            data.map(async (i) => {
                const tokenUri = await contract.uri(i.tokenId.toString());
                const meta = await axios.get(tokenUri);
                let price = ethers.utils.formatEther(i.price);
                let book = {
                    price,
                    name: meta.data.name,
                    tokenId: i.tokenId.toNumber(),
                    creator: i.creator,
                    supplyL: i.supplyleft.toNumber(),
                    cover: meta.data.cover,
                    file: meta.data.cover,
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
            <div className={styles.container}>
                <Dashboard />
                <div className={styles.pageDiv}>
                    <div className={styles.headDiv}>
                        <h2>You own {myBooks.length} Nft</h2>
                    </div>
                    <div className={styles.cardDiv}>
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
            </div>
        </>
    );
}
