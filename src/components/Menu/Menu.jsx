import React from 'react';
import {Link} from 'react-router-dom';
import { Button } from '@mui/material';
import { useAuth } from '../../contexts/userContext';
import { logout } from '../../utilities/firebase';
import styles from "./menu.module.css";

function Menu(){

    // get the logged in user data
    const {currentUser} = useAuth();
    console.log(currentUser);

    return(
        <div className={styles.menuWrapper}>
            <h1 className={styles.menuLabel}>Menu</h1>
            <h2>Welcome back {currentUser.name}</h2>

            {/* add more feaure option below this */}
            <div>
                <Link className={styles.button} to="/question-spam"><Button variant='contained'>Question spam</Button></Link>
                
            </div>

            <Link className={styles.button} to="/score"><Button variant='contained'>Score</Button></Link>
            <Button variant='contained' onClick={logout}>Logout</Button>
        </div>
    )
}

export default Menu