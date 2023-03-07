import { Button } from '@mui/material'
import React from 'react'
import { logout, signInWithGoogle } from '../../utilities/firebase';

function LogUp() {
    
  return (
    <>
    <Button variant="outlined" onClick={signInWithGoogle}>Login</Button>
    <Button variant="outlined" onClick={logout}>Logout</Button>
    </>
  )
}

export default LogUp