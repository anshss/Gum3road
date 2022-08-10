import { ethers } from "ethers";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { useRouter } from "next/router";
import { useState } from "react";
import web3modal from "web3modal";
import Dashboard from "../components/Dashboard";
import styles from "../styles/dashboard.module.scss";
import { contractAddress } from "../config.js";
import Gum3road from "../artifacts/contracts/Gum3road.sol/Gum3road.json";

export default function Publish() {
    const [formInput, setFormInput] = useState({
        name: "",
        price: "",
        cover: null,
        file: null,
    });

    const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");

    const router = useRouter();

    const [tesh, setTesh] = useState(false);

    async function handleFile(e) {
        const file = e.target.files[0];
        const name = e.target.name;
        try {
            const added = await client.add(file);
            const url = `https://ipfs.infura.io/ipfs/${added.path}`;
            setFormInput({ ...formInput, [name]: url });
        } catch (error) {
            console.log("Error uploading:", error);
        }
    }

    async function metadata() {
        const { name, price, cover, file } = formInput;
        if (!name || !price || !cover || !file) return;
        try {
            const data = JSON.stringify({ name, cover, file });
            const added = await client.add(data);
            const metaUrl = `https://ipfs.infura.io/ipfs/${added.path}`;
            return metaUrl;
        } catch (error) {
            console.log("Error uploading:", error);
        }
    }

    async function uploadToIpfs(e) {
        e.preventDefault();
        try {
            const modal = new web3modal();
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
            const publish = await contract.createToken(metadata, 10, price, {
                gasLimit: 2000000,
                // nonce: nonce || undefined,
            });
            await publish.wait();

            console.log(url);

            // // ----------
            // let test = contract.test();
            // setTesh(test);
            // // --------
        } catch (error) {
            console.log(error.message);
            console.log(error);
        }

        // router.push('/');
    }

    async function conso() {
        const test = await metadata();
        console.log(formInput);
    }

    return (
        <>
            <Dashboard />
            <div className={styles.publish}>
                <form>
                    <label>Item Name</label>
                    <input
                        name="name"
                        required
                        onChange={(e) =>
                            setFormInput({ ...formInput, name: e.target.value })
                        }
                    />
                    <label>Product</label>
                    <select name="product">
                        <option value="eBook">eBook</option>
                    </select>
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
                        value="Publish🚀"
                        onClick={uploadToIpfs}
                    />
                </form>
                <button onClick={conso}>Click me</button>
            </div>
        </>
    );
}
