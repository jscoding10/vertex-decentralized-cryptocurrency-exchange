## Vertex Decentralized Cryptocurrency Exchange 

https://github.com/jscoding10/vertex-decentralized-cryptocurrency-exchange/assets/147340427/0f6592eb-fd20-4201-be59-2a081b43aca9

<br>
<img width="100%" alt="Vertex Exchange" src="https://github.com/jscoding10/vertex-decentralized-cryptocurrency-exchange/assets/147340427/e58015f2-adbd-433d-93ed-a4ec630a6911">

<br>
<br> 

**Vertex web application:** https://vertex-decentralized-crypto-exchange.netlify.app/
<br>
<br>
Vertex is a decentralized cryptocurrency exchange with MetaMask pairing, live smart contract data fetching, and the ability to swap ERC20 tokens on the Goerli Testnet. 

## Prerequisites
* Yarn (if want to install local copy)
* MetaMask cryptocurrency wallet

**Note: If user desires to swap cryptocurrencies, they will need a balance of WETH on the Goerli Testnet**

## Instructions
**How to use Vertex Decentralized Cryptocurrency Exchange**
1. Open the <a href="https://vertex-decentralized-crypto-exchange.netlify.app/">Vertex web application</a>.
2. Click the “Connect Wallet” button in the top right corner
3. Choose which account to connect in the MetaMask popup window. Vertex should show the wallet address where the "Connect Wallet" button was if wallet connection is successful.
4. Select the token you wish to swap from the token drop down. Vertex should show the current balance of the selected token in the MetaMask wallet. 
5. Select the token you want to swap for from the token drop down.
6. Enter the amount of the token you wish to swap. Vertex should show how much of the token you want to swap for will be received.
7. Click the "Swap" button on the bottom and approve and sign the transaction in the MetaMask popup window.
8. Wait until the transaction is complete
9. Vertex will display a message depending upon if the swap if successful or not.

**To set up a local copy, follow these simple steps:**  
```
1. cd vertex-decentralized-cryptocurrency-exchange-main
2. npm install  
3. npm run react-app:start
```
If you do not have Yarn installed, please type the following into the terminal or Vertex will not start on the local copy:
<br>
`npm install yarn`
<br>
<br>
The local copy of Vertex runs on localhost:3000. 

## Technology Used
### Client
<img align="left" alt="HTML" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-plain.svg" />
<img align="left" alt="CSS" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain.svg" />
<img align="left" alt="JavaScript" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-plain.svg" />
<img align="left" alt="React" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" />
<img align="left" alt="Tailwind CSS" width="30px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg" />
<br>
<br>
With Vertex, the user can swap specific ERC20 tokens on the Goerli Testnet. The client allows the user to connect their MetaMask wallet to the exchange and select the tokens and amount they wish to swap and sends the data to the smart contract and blockchain.  

### Smart Contract  
Cranq, MetaMask, Alchemy, Smart Contracts tools
<br>
<br>
The smart contract interacts with the Ethereum blockchain (specifically Goerli Testnet). Cranq was used to compile and deploy the smart contract. It was also used to create the liquidity pairs for the tokens on Vertex.

## Lessons Learned
While completing Vertex, I learned how to use custom hooks and utility functions in React for state management. Further, I honed my ability to use Tailwind CSS to style the application and make it responsive on all devices. I also learned how to create, compile, and deploy my own smart contracts to the Ethereum blockchain. Finally, I learned how to build a decentralized cryptocurrency exchange and improved my understanding of how blockchains and smart contracts function. 

## Improvements
One improvement to Vertex would be to include more token pairs for the user to swap on the smart contract. Additionally, I could include a search feature when the user is trying to select a token to make it easier to find their desired token. Moreover, I could add support for more cryptocurrency wallets than MetaMask to allow users more flexibility when swapping.

This project was bootstrapped with [Create Eth App](https://github.com/paulrberg/create-eth-app).

## Project Structure

The default template is a monorepo created with [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/).

Workspaces makes it possible to setup multiple packages in such a way that we only need to run `yarn install` once to install all of them in
a single pass. Dependencies are hoisted at the root.

```
my-eth-app
├── README.md
├── node_modules
├── package.json
├── .gitignore
└── packages
    ├── contracts
    │   ├── README.json
    │   ├── package.json
    │   └── src
    │       ├── abis
    │       │   ├── erc20.json
    │       │   └── ownable.json
    │       ├── addresses.js
    │       └── index.js
    ├── react-app
    │   ├── README.md
    │   ├── node_modules
    │   ├── package.json
    │   ├── public
    │   │   ├── favicon.ico
    │   │   ├── index.html
    │   │   ├── logo192.png
    │   │   ├── logo512.png
    │   │   ├── manifest.json
    │   │   └── robots.txt
    │   └── src
    │       ├── App.css
    │       ├── App.js
    │       ├── App.test.js
    │       ├── ethereumLogo.svg
    │       ├── index.css
    │       ├── index.js
    │       ├── serviceWorker.js
    │       └── setupTests.js
    └── subgraph
        ├── README.md
        ├── abis
        │   └── erc20.json
        ├── package.json
        ├── schema.graphql
        ├── src
        │   └── mappings
        │       ├── tokens.ts
        │       └── transfers.ts
        └── subgraph.yaml
```

Owing to this dependency on Yarn Workspaces, Create Eth App can't be used with npm.

## Available Scripts

In the project directory, you can run:

### React App

#### `yarn react-app:start`

Runs the React app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will automatically reload if you make changes to the code.<br>
You will see the build errors and lint warnings in the console.

#### `yarn react-app:test`

Runs the React test watcher in an interactive mode.<br>
By default, runs tests related to files changed since the last commit.

[Read more about testing React.](https://facebook.github.io/create-react-app/docs/running-tests)

#### `yarn react-app:build`

Builds the React app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the React documentation on [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `yarn react-app:eject`

**Note: this is a one-way operation. Once you `react-app:eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` the React app at any time. This command will
remove the single build dependency from your React package.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right
into the `react-app` package so you have full control over them. All of the commands except `react-app:eject` will still work,
but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `react-app:eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Subgraph

The Graph is a tool for for indexing events emitted on the Ethereum blockchain. It provides you with an easy-to-use GraphQL API. <br/>

To learn more, check out the [The Graph documentation](https://thegraph.com/docs).

#### `yarn subgraph:codegen`

Generates AssemblyScript types for smart contract ABIs and the subgraph schema.

#### `yarn subgraph:build`

Compiles the subgraph to WebAssembly.

#### `yarn subgraph:auth`

Before deploying your subgraph, you need to sign up on the
[Graph Explorer](https://thegraph.com/explorer/). There, you will be given an access token. Drop it in the command
below:

```sh
GRAPH_ACCESS_TOKEN=your-access-token-here yarn subgraph:auth
```

#### `yarn subgraph:deploy`

Deploys the subgraph to the official Graph Node.<br/>

Replace `paulrberg/create-eth-app` in the package.json script with your subgraph's name.

You may also want to [read more about the hosted service](https://thegraph.com/docs/quick-start#hosted-service).