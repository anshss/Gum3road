import styles from "../styles/dashboard.module.scss";
import { useEffect, useState } from "react";
import web3modal from "web3modal";
import { ethers } from "ethers";
import axios from "axios";
import { contractAddress } from "../address.js";
import Gum3road from "../artifacts/contracts/Gum3road.sol/Gum3road.json";

export default function Store() {
    const [books, setBooks] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const ipfsGateway = "https://anshs-gum3road.infura-ipfs.io/ipfs/";

    useEffect(() => {
        loadEbooks();
    }, []);

    async function loadEbooks() {
        const modal = new web3modal();
        const connection = await modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const contract = new ethers.Contract(
            contractAddress,
            Gum3road.abi,
            provider
        );
        const data = await contract.fetchStore();
        const books = await Promise.all(
            data.map(async (i) => {
                //when the array of promises is resolved then map over each promise
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

        setBooks(books);
        setLoaded(true);
    }

    async function buyBooks(book) {
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
        const price = ethers.utils.parseUnits(book.price.toString(), "ether");
        const transaction = await contract.buy(book.tokenId, {
            value: price,
            gasLimit: 1000000,
        });
        await transaction.wait();
        loadEbooks();
    }

    function Card(prop) {
        return (
            <div className={styles.card}>
                <div className={styles.imgDiv}>
                    <img src={prop.img} alt="" />
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
                <div className={styles.buyDiv} onClick={() => buyBooks(prop)}>
                    <p>Buy Now</p>
                </div>
            </div>
        );
    }

    if (loaded == true && !books.length)
        return (
            <div className={styles.noItem}>
                <h1>No items in marketplace :/</h1>
            </div>
        );
    return (
        <>
            <div className={styles.store}>
            <div className={styles.cardDiv}>
                {books.map((book, i) => (
                    <Card
                        key={i}
                        img={book.cover}
                        name={book.name}
                        price={book.price}
                        supplyL={book.supplyL}
                        tokenId={book.tokenId}
                        creator={book.creator}
                    />
                ))}
            </div>
            </div>
        </>
    );
}
