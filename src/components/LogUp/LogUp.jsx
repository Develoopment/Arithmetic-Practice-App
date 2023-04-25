import React from 'react'
import { signInWithGoogle } from '../../utilities/firebase';
import styles from './logup.module.scss'

function LogUp() {
    
  return (

    <div className={styles.loginContainer}>

      <div className={styles.googleBtn}>
        <div className={styles.googleIconWrapper}>
          <img className={styles.googleIcon} src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
        </div>
        <p className={styles.btnText} onClick={signInWithGoogle}>Sign in with google</p>
      </div>

    </div>

  )
}

export default LogUp