import React from 'react'
import { formatUnits, parseUnits } from 'ethers/lib/utils';

import styles from '../styles';

const Balance = ({ tokenBalance }) => {
  
  return (
    <div className={styles.balance}>
      <p className={styles.balanceText}>
        {/* Check if token balance exists - if exists render the token balance and if it does not exist return 0 */}
        {tokenBalance && (
          <>
            <span classname={styles.balanceBold}>Balance: </span>
            {formatUnits(tokenBalance || parseUnits("0"))}
          </>
        )}
      </p>
    </div>
  )
}

export default Balance