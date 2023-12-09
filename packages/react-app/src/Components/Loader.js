import React from 'react'

import styles from '../styles';
import { vertexLoading } from '../assets';
// Display while loading pools
const Loader = ({ title }) => { 
  return (
    <div className={styles.loader}>
        <img src={vertexLoading} 
        alt="vertex logo"
        className={styles.loaderImg}
        />
        <p className={styles.loaderText}>{title}</p>
    </div>
  )
}

export default Loader