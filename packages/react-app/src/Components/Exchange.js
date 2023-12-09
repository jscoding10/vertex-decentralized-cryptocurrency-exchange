import React, { useEffect, useState } from 'react';
import { Contract } from '@ethersproject/contracts';
import { abis } from '@my-app/contracts';
import { ERC20, useContractFunction, useEthers, useTokenAllowance, useTokenBalance } from '@usedapp/core';
import { ethers } from 'ethers';
import { parseUnits } from 'ethers/lib/utils'; 
import { getAvailableTokens, getCounterpartTokens, findPoolByTokens, isOperationPending, getFailureMessage, getSuccessMessage } from '../utils'; 
import { ROUTER_ADDRESS } from '../config';
import { AmountIn, AmountOut, Balance } from './'
import styles from '../styles';

const Exchange = ({ pools }) => {
  const { account } = useEthers();
  const [fromValue, setFromValue] = useState("0"); // Initialize value as 0
  const [fromToken, setFromToken] = useState(pools[0].token0Address); // Which token exchange from 
  const [toToken, setToToken] = useState(""); 
  const [resetState, setResetState] = useState(false); // Reset success message

  // Parse units
  const fromValueBigNumber = parseUnits(fromValue);
  // Which tokens can swap from with liquidity pools
  const availableTokens = getAvailableTokens(pools);
  // Tokens which can make a conversion to
  const counterpartTokens = getCounterpartTokens(pools, fromToken);
  // Pair address for liquidity pair
  const pairAddress = findPoolByTokens(pools, fromToken, toToken)?.address ?? "";

  // Router address
  const routerContract = new Contract(ROUTER_ADDRESS, abis.router02);
  // Which contract transacting from
  const fromTokenContract = new Contract(fromToken, ERC20.abi);
  // Know balance of token want to swap
  const fromTokenBalance = useTokenBalance(fromToken, account);
  // Know balance of token want to exchange to
  const toTokenBalance = useTokenBalance(toToken, account);
  // Token allowance
  const tokenAllowance = useTokenAllowance(fromToken, account, ROUTER_ADDRESS) || parseUnits("0");
  // Check if from value greater than token allowance, if so need approval to make swap
  const approvedNeeded = fromValueBigNumber.gt(tokenAllowance);
  // Check if from token balance greater than 0
  const fromValueIsGreatThan0 = fromValueBigNumber.gt(parseUnits("0"));
  // Ensure have enough balance of token to swap
  const hasEnoughBalance = fromValueBigNumber.lte(fromTokenBalance ?? parseUnits("0"));

  // Approve initiating a contract call - state to sender
  const { state: swapApproveState, send: swapApproveSend } = useContractFunction(fromTokenContract, "approve", {
    transactionName: "onApproveRequested",
    gasLimitBufferPercentage: 10,
  });

  // Swap initiating a contract call - state to sender
  const { state: swapExecuteState, send: swapExecuteSend } = useContractFunction(routerContract, "swapExactTokensForTokens", {
    transactionName: "swapExactTokensForTokens", // Uniswap functionality - smart contract was built upon Uniswap functionality
    gasLimitBufferPercentage: 10,
  });

  // Conditionally render buttons
  // Currently approving
  const isApproving = isOperationPending(swapApproveState); 
  // Currently swapping
  const isSwapping = isOperationPending(swapExecuteState); 
  // Check to approve the transaction
  const canApprove = !isApproving && approvedNeeded;
  // Check to swap
  const canSwap = !approvedNeeded && !isSwapping && fromValueIsGreatThan0 && hasEnoughBalance;

  // Successful transaction - approval and execution must both be successful
  const successMessage = getSuccessMessage(swapApproveState, swapExecuteState);
  // Unsuccessful transaction
  const failureMessage = getFailureMessage(swapApproveState, swapExecuteState)
  
  // Once request approval for transaction - written this way in Uniswap documents
  const onApproveRequested = () => {
    swapApproveSend(ROUTER_ADDRESS, ethers.constants.MaxUint256);
  }

  // Uniswap documentation
  const onSwapRequested = () => {
    swapExecuteSend(
      fromValueBigNumber,
      0,
      [fromToken, toToken],
      account,
      Math.floor(Date.now() / 1000) + 60 * 20
    ).then(() => {
      setFromValue("0");
    });
  }

  const onFromValueChange = (value) => {
    const trimmedValue = value.trim();

    try {
      if(trimmedValue) {
        parseUnits(value);
        setFromValue(value);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const onFromTokenChange = (value) => {
    setFromToken(value);
  }

  const onToTokenChange = (value) => {
    setToToken(value);
  }

  useEffect(() => {
    if(failureMessage || successMessage) {
      setTimeout(() => {
        setResetState(true);
        setFromValue("0");
        setToToken("");
      }, 5000)
    }
  }, [failureMessage, successMessage]);
  
  // User interface of Exchange Component
  return (
    <div className="flex flex-col w-full items-center">
      <div className="mb-8">
        <AmountIn
          value={fromValue}
          onChange={onFromValueChange}
          currencyValue={fromToken}
          onSelect={onFromTokenChange}
          currencies={availableTokens}
          isSwapping={isSwapping && hasEnoughBalance}
        />
        <Balance tokenBalance={fromTokenBalance} />
      </div>
      <div className="mb-8 w-[100%]">
        <AmountOut
          fromToken={fromToken}
          toToken={toToken}
          amountIn={fromValueBigNumber}
          pairContract={pairAddress}
          currencyValue={toToken}
          onSelect={onToTokenChange}
          currencies={counterpartTokens}
        />
        <Balance tokenBalance={toTokenBalance} />
      </div>

      {/* Approval needed and not currenty swapping else show the swap button */}
      {approvedNeeded && !isSwapping ? (
        <button
          disabled={!canApprove}
          onClick={onApproveRequested}
          className={
            // Render styles if true or not
            `${canApprove
            ? "bg-site-green text-site-blue"
            : "bg-site-dim2 text-site-dim2"
            } ${styles.actionButton}`
          }
        >
          {isApproving ? "Approving..." : "Approve"}
        </button>
        ) : <button
            disabled={!canSwap}
            onClick={onSwapRequested}
            className={
                `${ 
                canSwap
                ? "bg-site-green text-site-blue"
                : "bg-site-dim2 text-site-dim2"
                } ${styles.actionButton}`
              }>
        
          {isSwapping ? "Swapping..." : hasEnoughBalance ? 
          "Swap" : "Insufficient balance" }
          
          </button>
      }

      {failureMessage && !resetState ? (
        <p className={styles.message}>{failureMessage}</p>
      ) : successMessage ? (
        <p className={styles.message}>{successMessage}</p>
      ) : ""}
    </div>
  )
}

export default Exchange