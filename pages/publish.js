import { ethers } from "ethers";
const ipfsClient = require("ipfs-http-client");
import { useRouter } from "next/router";
import { useState } from "react";
import web3modal from "web3modal";
import Dashboard from "../components/Dashboard";
import styles from "../styles/dashboard.module.scss";
import { contractAddress } from "../address.js";
import Gum3road from "../artifacts/contracts/Gum3road.sol/Gum3road.json";

export default function Publish() {
    const [formInput, setFormInput] = useState({
        name: "",
        price: "",
        supply: "",
        cover: null,
        file: null,
    });

    
    // ------- infura ipfs

    const projectId = process.env.NEXT_PUBLIC_projectId
    const projectSecret = process.env.NEXT_PUBLIC_projectSecret
    const ipfsGateway = "https://anshs-gum3road.infura-ipfs.io/ipfs/"

    const auth =
        "Basic " +
        Buffer.from(projectId + ":" + projectSecret).toString("base64");

    const client = ipfsClient.create({
        host: "ipfs.infura.io",
        port: 5001,
        protocol: "https",
        headers: {
            authorization: auth,
        },
    });

    // -------

    const router = useRouter();

    async function handleFile(e) {
        const file = e.target.files[0];
        const name = e.target.name;
        try {
            const added = await client.add(file);
            const url = `${ipfsGateway}${added.path}`;
            setFormInput({ ...formInput, [name]: url });
            console.log(url);
        } catch (error) {
            console.log("Error uploading:", error);
        }
    }

    async function metadata() {
        const { name, price, cover, file } = formInput;
        if (!name || !price || !cover || !file) return;
        const data = JSON.stringify({ name, cover, file });
        try {
            const added = await client.add(data);
            const metaUrl = `${ipfsGateway}${added.path}`;
            return metaUrl;
        } catch (error) {
            console.log("Error uploading:", error);
        }
    }

    async function uploadToIpfs(e) {
        e.preventDefault();
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
        const url = await metadata();
        const price = ethers.utils.parseEther(formInput.price);
        const supply = formInput.supply;
        const publish = await contract.createToken(url, supply, price, {
            gasLimit: 1000000,
        });
        await publish.wait();

        console.log(url);

        router.push("/store");
    }


    return (
        <>
            <div className={styles.container}>
                <Dashboard />
                <div className={styles.publish}>
                
                    <form>
                        <label>Item Name</label>
                        <input
                            name="name"
                            required
                            onChange={(e) =>
                                setFormInput({
                                    ...formInput,
                                    name: e.target.value,
                                })
                            }
                        />
                        <label>Price</label>
                        <input
                            name="price"
                            placeholder="Matic"
                            required
                            onChange={(e) =>
                                setFormInput({
                                    ...formInput,
                                    price: e.target.value,
                                })
                            }
                        />
                        <label>Copies</label>
                        <input
                            name="supply"
                            placeholder="10"
                            required
                            onChange={(e) =>
                                setFormInput({
                                    ...formInput,
                                    supply: e.target.value,
                                })
                            }
                        />
                        <label>Cover image</label>
                        <input
                            type="file"
                            name="cover"
                            required
                            onChange={handleFile}
                        />
                        <label>Upload file</label>
                        <input
                            type="file"
                            name="file"
                            required
                            onChange={handleFile}
                        />
                        <input
                            type="submit"
                            className={styles.submitbtn}
                            value="Mint🚀"
                            onClick={uploadToIpfs}
                        />
                    </form>
                </div>
            </div>
        </>
    );
}
