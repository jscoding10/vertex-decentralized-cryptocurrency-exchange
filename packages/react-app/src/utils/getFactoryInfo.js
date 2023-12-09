// Fees and liquidity pairs
import { abis } from '@my-app/contracts';
import { getPairsInfo } from './getPairsInfo';

export const getFactoryInfo = async (factoryAddress, web3) => {

    // Instance of factory
    const factory = new web3.eth.Contract(abis.factory, factoryAddress);

    const factoryInfo = {
        fee: await factory.methods.feeTo().call(), 
        feeToSetter: await factory.methods.feeToSetter().call(), 
        allPairsLength: await factory.methods.allPairsLength().call(), 
        allPairs: [], 
    }
    // Loop through all liquidity pairs
    for (let i = 0; i < factoryInfo.allPairsLength; i++) {
        factoryInfo.allPairs[i] = await factory.methods.allPairs(i).call(); 
    }
    
    factoryInfo.pairsInfo = await getPairsInfo(factoryInfo.allPairs, web3);
    
    return factoryInfo;
}