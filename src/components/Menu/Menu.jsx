import React from 'react';
import {Link} from 'react-router-dom';
import { Button } from '@mui/material';
import { useAuth } from '../../contexts/userContext';
import { logout } from '../../utilities/firebase';
import styles from "./menu.module.scss";

const operationButtonStyles = {"backgroundColor" : "#FF9500", "&:hover":{"backgroundColor" : "#FFAD2F"}};
const actionButtonStyles = {"backgroundColor" : "#1C1C1C", "&:hover" : {"backgroundColor" : "#2B2B2B"}};

function Menu(){

    // get the logged in user data
    const {currentUser} = useAuth();
    // console.log(currentUser);

    return(

        <div className={styles.menuContainer}>
    
            <div className={styles.menuWrapper}>
            <h1 className={styles.menuLabel}>Menu</h1>
            <h2>Welcome back {currentUser.name}</h2>

            {/* add more feaure option below this */}
            <div className={styles.mainAction}>
                <Link className={styles.button} to="/question-spam"><Button sx={operationButtonStyles} variant='contained'>Question spam</Button></Link>
                <Link className={styles.button} to="/score"><Button sx={operationButtonStyles} variant='contained'>Score</Button></Link>
            </div>

            <Button variant='contained' sx={actionButtonStyles} onClick={logout}>Logout</Button>
        </div>
        </div>

    )
}

export default Menu