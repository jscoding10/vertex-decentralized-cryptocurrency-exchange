import React from "react"
// Main package that allows to generate file and folder structure
import { useEthers } from '@usedapp/core' 

import { usePools } from './hooks';
import styles from './styles';
// Import Vertex logo
import { vertexLogo } from './assets'; 
// Import Components
import { Exchange, Loader, WalletButton } from './Components';


const App = () => {
  // Access to Metamask account if connected - from @usedapp/core
  const { account } = useEthers(); 
  const [loading, pools] = usePools(); 
  // Layout
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <header className={styles.header}>
          <img
            src={vertexLogo}
            alt="vertex logo"
            className="w-20 h-20 object-contain" 
          />
          {/* // Render Component */}
          <WalletButton />
        </header>

        <div className={styles.exchangeContainer}> 
          <h1 className={styles.headTitle}>Vertex</h1>
          <p className={styles.subTitle}>Decentralized Exchange</p>
          <div className={styles.exchangeBoxWrapper}>
            <div className={styles.exchangeBox}>
              <div className="green_gradient"/>
              <div className={styles.exchange}>
                  {/* Check if have connected Metamask account to decentralized exchange */}
                  {/* If account exists and if liquidity pools are loading, render Loader compnent */}
                  {/* If account exists and liquidity pools are not loading then render Exchange component */}
                  {/* If do not have account redner Loader component */}
                {account ? (
                  loading ? (
                    <Loader title="Loading pools" />
                  ) : <Exchange pools={pools} /> // Exchange component can recieve pools from props
                ) : <Loader title="Please connect your wallet" />}   
              </div>
              <div className="blue_gradient"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;