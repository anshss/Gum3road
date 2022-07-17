import { useState } from 'react';
import styles from '../styles/home.module.scss';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {ethers} from 'ethers';



export default function Login(){
    const [LoggedIn, setLoggedIn] = useState(false);
    const [DefaultAddress, setDefaultAddress] = useState();

    const handleLogin = async () => {
        if (typeof window !== 'undefined'){;
            if (window.ethereum){
                window.ethereum.request({ method: 'eth_requestAccounts'})
                .then(result => {
                    setDefaultAddress(result[0]);
                    setLoggedIn(true);
                })
            }
        }
    }

    return(
        <div className={styles.login}>
            {LoggedIn ? <AccountCircleIcon onClick={handleLogin}/> : <LoginIcon onClick={handleLogin}/>}
            <p className={styles.address}>{DefaultAddress}</p>
        </div>
    )
}