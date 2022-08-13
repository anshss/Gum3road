import React from "react";
import styles from "../styles/store.module.scss";

export default function Card(prop) {
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
            <div className={styles.buyDiv}><p>Buy Now</p></div>
        </div>
    );
}
