import React from 'react';
import {Link} from 'react-router-dom';
import { Button } from '@mui/material';
import { useAuth } from '../../contexts/userContext';
import { logout } from '../../utilities/firebase';

function Menu(){

    // get the logged in user data
    const {currentUser} = useAuth();
    // console.log(currentUser);

    return(
        <div className='menu-wrapper'>
            <h1>Menu</h1>
            <h2>Welcome back {currentUser.name}</h2>

            {/* add more feaure option below this */}
            <div>
                <Link to="/question-spam"><Button variant='contained'>Question spam</Button></Link>
                <Button variant='contained' onClick={logout}>Logout</Button>
            </div>

            <Link to="/score"><Button variant='contained'>Score</Button></Link>
        </div>
    )
}

export default Menu