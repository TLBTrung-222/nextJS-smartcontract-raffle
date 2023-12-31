# Table of content

-   [NextJS Smartcontract Lottery (Raffle) FCC](#nextjs-smartcontract-lottery-raffle-fcc)
-   [Getting Started](#getting-started)
    -   [Requirements](#requirements)
    -   [Quickstart](#quickstart)
-   [Usage](#usage)
-   [Deploying to IPFS](#deploying-to-ipfs)
-   [Deploy to IPFS using Fleek](#deploy-to-ipfs-using-fleek)

# NextJS Smartcontract Lottery (Raffle) FCC

This is a section of the Javascript Blockchain/Smart Contract FreeCodeCamp Course.

![App](img/readme-app.png)

[Example App on Fleek here!](https://black-waterfall-4509.on.fleek.co/)  
Example App on IPFS: ipfs://QmPfed5L3M44EWrvs2sKnovvmKgHkPqMTH8rDp4tAdxo4n

### Built with:

#### UI

`NextJS`: React framework to build UI  
`Tailwind`: CSS framework for styling UI  
`web3uikit`: get built-in components (connect button + notification trigger)  
`Moralis`: get `chainId` and `isWeb3Enabled` properties

#### Smartcontract

`Solidity`: main smartcontract development language in Ethereum  
`Chainlink`: for randomness and automation services  
`Ethers`: library to interact with smartcontract using JS  
`Hardhat`: development environment for Ethereum software

#### Storage

`IPFS`: protocol to store data (frontend code)

# Getting Started

## Requirements

-   [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
    -   You'll know you did it right if you can run `git --version` and you see a response like `git version x.x.x`
-   [Nodejs](https://nodejs.org/en/)
    -   You'll know you've installed nodejs right if you can run:
        -   `node --version` and get an ouput like: `vx.x.x`
-   [Yarn](https://yarnpkg.com/getting-started/install) instead of `npm`
    -   You'll know you've installed yarn right if you can run:
        -   `yarn --version` and get an output like: `x.x.x`
        -   You might need to [install it with `npm`](https://classic.yarnpkg.com/lang/en/docs/install/) or `corepack`
-   [Metamask](https://metamask.io/)
    -   Dowload this crypto wallet extension to interact with blockchains

## Quickstart

```
git clone https://github.com/TLBTrung-222/nextJS-smartcontract-raffle.git
cd nextjs-smartcontract-raffle
yarn
yarn dev
```

# Usage

### 1. Run your local blockchain with the lottery code

> In a different terminal / command line

```
git clone https://github.com/TLBTrung-222/smart-contract-raffle.git
cd smart-contract-raffle
yarn
yarn hardhat node
```

### 2. Add hardhat network to your metamask/wallet

-   Get the RPC_URL of your hh node (usually `http://127.0.0.1:8545/`)
-   Go to your wallet and add a new network. [See instructions here.](https://metamask.zendesk.com/hc/en-us/articles/360043227612-How-to-add-a-custom-network-RPC)
    -   Network Name: Hardhat-Localhost
    -   New RPC URL: http://127.0.0.1:8545/
    -   Chain ID: 31337
    -   Currency Symbol: ETH (or GO)
    -   Block Explorer URL: None

Ideally, you'd then [import one of the accounts](https://metamask.zendesk.com/hc/en-us/articles/360015489331-How-to-import-an-Account) from hardhat to your wallet/metamask.

### 3. Run this frontend code

Back in a different terminal with the code from this repo, run:

```
yarn dev
```

### 4. Go to UI and have fun!

Head over to your [localhost](http://localhost:3000) and play with the lottery!

# Deploying to IPFS

### 1. Build your static code.

```
yarn build
```

### 2. Export your site

```
yarn next export
```

> Note: Some features of NextJS & Moralis are not static, if you're deviating from this repo, you might run into errors.

### 3. Deploy to IPFS

-   [Download IPFS desktop](https://ipfs.io/#install)
-   Open your [IPFS desktop app](https://ipfs.io/)
-   Select `import` and choose the folder the above step just created (should be `out`)

### 4. Copy the CID of the folder you pinned

### 5. Get [IPFS companion](https://chrome.google.com/webstore/detail/ipfs-companion/nibjojkomfdiaoajekhjakgkdhaomnch?hl=en) for your browser (or use [Brave Browser](https://brave.com/))

### 6. Go to `ipfs://YOUR_CID_HERE` and see your ipfs deployed site!

# Deploy to IPFS using Fleek

You can also have [Fleek](https://fleek.co/) auto-deploy your website if you connect your github. Connect to fleek and follow along the docs there. You'll get an IPFS hash and a "regular" URL for your site.
