import Dashboard from "../components/dashboard";
import styles from "../styles/dashboard.module.scss";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

export default function Publish() {
    return (
        <>
            <Dashboard />
            <div className={styles.publish}>
                <form>
                    <label>Item Name</label>
                    <input name="name" required/>
                    <label>Product</label>
                    <select name="product">
                        <option value="eBook">eBook</option>
                    </select>
                    <label>Price</label>
                    <input name="price" placeholder="Matic" required/>
                    <label>Cover image</label>
                    <input type="file" name="coverimg" required/>
                    <input type="submit" className={styles.submitbtn} />
                </form>
            </div>
        </>
    );
}
