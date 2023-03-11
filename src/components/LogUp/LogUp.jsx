import React from 'react'
import { signInWithGoogle } from '../../utilities/firebase';
import styles from './logup.module.scss'

function LogUp() {
    
  return (

    <div className={styles.loginContainer}>

      <div class={styles.googleBtn}>
        <div class={styles.googleIconWrapper}>
          <img class={styles.googleIcon} src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
        </div>
        <p class={styles.btnText} onClick={signInWithGoogle}>Sign in with google</p>
      </div>

    </div>

  )
}

export default LogUp