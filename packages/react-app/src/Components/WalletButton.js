import React, { useState, useEffect} from 'react'
import { shortenAddress, useEthers, useLookupAddress } from '@usedapp/core';

import styles from '../styles';

const WalletButton = () => {
    // Help determine if show connect wallet button or address of account connected
    const [accountAddress, setAccountAddress] = useState(''); 
    // Ethereum name service lookup
    const { ens } = useLookupAddress();
    // Use Ethers package
    const { account, activateBrowserWallet, deactivate } = useEthers();
    // If ens exists, set account address equal to ens
    // Else if account exists, set equal account address equal to account - want to first storten address with utility function
    // Else set account address to empty string
    useEffect(() => {
        if(ens) {
            setAccountAddress(ens);
        } else if (account) {
            setAccountAddress(shortenAddress(account));
        } else {
            setAccountAddress('');
        }
    }, [account, ens, setAccountAddress]) // Recall Effect hook whenever account, ens, or account address changes

    return (
        <button 
            onClick={() => { // If no account from use Ethers then call activate browser wallet
                if (!account) {
                    activateBrowserWallet();
                } else { // Else deactivate
                    deactivate();
                }
            }}
            className={styles.walletButton}
        >
            {/* // If account address does exist, show the account address, otherwise show "Connect wallet"  */}
            {accountAddress || "Connect Wallet"} 
    </button>
  )
}

export default WalletButton