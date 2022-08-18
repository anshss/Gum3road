import { useEffect, useState } from 'react';
import styles from '../styles/home.module.scss';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {ethers} from 'ethers';

export default function Login(){
    const [LoggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        // const add = window.localStorage.getItem('address');
        // if(add != undefined){ setLoggedIn(true)}
    }, [])

    const handleLogin = async () => {
        if (typeof window !== 'undefined'){;
            if (window.ethereum){
                window.ethereum.request({ method: 'eth_requestAccounts'})
                .then(result => {
                    setLoggedIn(true);
                    window.localStorage.setItem('address', result[0]);
                })
            }
        }
    }

    return(
        <div className={styles.login}>
            {LoggedIn ? <AccountCircleIcon onClick={handleLogin}/> : <LoginIcon onClick={handleLogin}/>}
        </div>
    )
}
