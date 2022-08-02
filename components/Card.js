import React from "react";
import styles from "../styles/store.module.scss";

export default function Card(prop) {
    return (
        <div className={styles.card}>
            <div className={styles.imgdiv}>
                <img src={prop.img} alt="" />
            </div>
            <div className={styles.detailsdiv}>
                <p>Name: {prop.name}</p>
                <p>Price: {prop.price} eth</p>
                <p>Supply Left: {prop.supplyleft}</p>
                <p>Token Id: {prop.tokenId}</p>
            </div>
            <div className={styles.buydiv}><p>Buy Now</p></div>
        </div>
    );
}
