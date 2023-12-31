import { abis } from '@my-app/contracts';

export const getPairsInfo = async (pairAddresses, web3) => {
    const pairsInfo = [];
    const pairABI = abis.pair;
    const tokenABI = abis.erc20.abi;
    
    // Loop over addresses for specific info on each liquidity pair
    for (let i = 0; i < pairAddresses.length; i++) {
        const pairAddress = pairAddresses[i]; // Current pair
        const pair = new web3.eth.Contract(pairABI, pairAddress); // Specific pair

        const token0Address = await pair.methods.token0().call(); // First token of liquidty pair (Token 0)
        const token1Address = await pair.methods.token1().call(); // Second token of liquidty pair (Token 1)

        const token0Contract = new web3.eth.Contract(tokenABI, token0Address); // Contract of Token 0
        const token1Contract = new web3.eth.Contract(tokenABI, token1Address); // Contract of Token 1

        const token0Name = await token0Contract.methods.name().call();
        const token1Name = await token1Contract.methods.name().call();

        pairsInfo.push ({
            address: pairAddress,
            token0Address,
            token1Address,
            token0Name,
            token1Name
        })
    }

    return pairsInfo;
}