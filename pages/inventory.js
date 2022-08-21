import Dashboard from "../components/Dashboard";
import styles from "../styles/dashboard.module.scss";
import { useEffect, useState } from "react";
import web3modal from "web3modal";
import { ethers } from "ethers";
import axios from "axios";
import { contractAddress } from "../address.js";
import { saveAs } from "file-saver";
import Gum3road from "../artifacts/contracts/Gum3road.sol/Gum3road.json";
import file from "@babel/core/lib/transformation/file/file";

export default function Inventory() {
    const [myItems, setMyItems] = useState([]);
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
        const items = await Promise.all(
            data.map(async (i) => {
                const tokenUri = await contract.uri(i.tokenId.toString());
                const meta = await axios.get(tokenUri);
                let price = ethers.utils.formatEther(i.price);
                let item = {
                    price,
                    name: meta.data.name,
                    tokenId: i.tokenId.toNumber(),
                    creator: i.creator,
                    supplyL: i.supplyleft.toNumber(),
                    cover: meta.data.cover,
                    file: meta.data.file,
                };
                return item;
            })
        );
        setMyItems(items);
        setLoaded(true);
    }

    async function Download(_fileName, _fileUrl) {
        const name = _fileName;
        const fileUrl = _fileUrl;
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
                <div className={styles.buyDiv} onClick={() => Download(prop.name, prop.file)}>
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
                        <h2>You own {myItems.length} Nft</h2>
                    </div>
                    <div className={styles.cardDiv}>
                        {myItems.map((item, i) => (
                            <Card
                                key={i}
                                cover={item.cover}
                                name={item.name}
                                price={item.price}
                                supplyL={item.supplyL}
                                tokenId={item.tokenId}
                                creator={item.creator}
                                file={item.file}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
