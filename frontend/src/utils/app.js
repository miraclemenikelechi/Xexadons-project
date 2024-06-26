const { ethers } = require("ethers");

const baseAPIURL = "http://localhost:3300/"

const factoryABI = [
    {
        "inputs": [
          {
            "internalType": "address",
            "name": "token",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "_router",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "_curve",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "_fee",
            "type": "uint256"
          }
        ],
        "name": "createPair",
        "outputs": [
          {
            "internalType": "address",
            "name": "pair",
            "type": "address"
          }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getPoolCount",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "name": "allPairs",
        "outputs": [
          {
            "internalType": "address",
            "name": "",
            "type": "address"
          }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "token",
          "type": "address"
        }
      ],
      "name": "getPairs",
      "outputs": [
        {
          "internalType": "address[]",
          "name": "pairs",
          "type": "address[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
]

const chainIcon = {
  80002: "/matic.png",
}

const nftABI = [
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tokenId",
          "type": "uint256"
        }
      ],
      "name": "ownerOf",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "operator",
          "type": "address"
        },
        {
          "internalType": "bool",
          "name": "approved",
          "type": "bool"
        }
      ],
      "name": "setApprovalForAll",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

const pairABI = [
    {
      "inputs": [
        {
          "internalType": "uint256[]",
          "name": "tokenIds",
          "type": "uint256[]"
        },
        {
          "internalType": "address",
          "name": "_from",
          "type": "address"
        }
      ],
      "name": "addLiquidity",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "tokenAddress",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256[]",
          "name": "tokenIds",
          "type": "uint256[]"
        },
        {
          "internalType": "address",
          "name": "to",
          "type": "address"
        }
      ],
      "name": "swap",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "payable",
      "type": "function"
    },
    {
        "inputs": [],
        "name": "reserve0",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "reserve1",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
    },
]

const curveABI = [
    {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "tokenLength",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "reserve0",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "reserve1",
            "type": "uint256"
          },
          {
            "internalType": "address",
            "name": "pairAddress",
            "type": "address"
          },
        ],
        "name": "getBuyPriceSingle",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "amountIn",
            "type": "uint256"
          }
        ],
        "stateMutability": "pure",
        "type": "function"
    },
]

const routerABI = [
    {
        "inputs": [
          {
            "internalType": "uint256[]",
            "name": "tokenIds",
            "type": "uint256[]"
          },
          {
            "internalType": "address",
            "name": "pairAddress",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          }
        ],
        "name": "swapETHforNFT",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [
          {
            "internalType": "uint256[]",
            "name": "tokenIds",
            "type": "uint256[]"
          },
          {
            "internalType": "address",
            "name": "pairAddress",
            "type": "address"
          },
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          }
        ],
        "name": "swapNFTforETH",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
]

const deploymentAddresses = {
  factory: {
    80002: "0x63f52C7d448cFdd3ED6F8B4Ad92272B1419895b0",
    97: "0xFa2C0D7AD5bf7259F564380D707cF95683CBe264"
  },
  curve: {
    80002: "0x471367B20F644E058F7092a34b2d2Ea90B26BB0d",
    97: "0xCc045dCb5C6FEf4273B498e0c364f760F0415997"
  },
  router: {
    80002: "0x7937b7787E1236685162EedE657b9d631025F2Fb",
    97: "0x5C67Bf96A7508bFf7a8B3bfe53E6108066F7b41E"
  },
  xexadon: {
    80002: "0x64dCb39317940d74b711eCE72595b6a80D37B8ad",
    97: "0x5f74e9D1EDA4fcd81B2Aa9C842eB1EE47561f70d"
  }
}

const rpcUrls = {
  80002: "https://rpc-amoy.polygon.technology",
  97: "https://data-seed-prebsc-1-s1.bnbchain.org:8545"
}

export const getAppAddress = (chainId) => {
  return deploymentAddresses.xexadon[chainId];
}

export const createPool = async(ids, ethAmount, nftAddress, fee, chainId, signer) => {
  //get factory Contract, call createpair, approve pair, add 
  const factoryAddress = deploymentAddresses.factory[chainId];
  const routerAddress = deploymentAddresses.router[chainId];
  const curveAddress = deploymentAddresses.curve[chainId];
  const userAddress = await signer.getAddress();

  const _fee = fee * 10;
  const factoryContract = new ethers.Contract(factoryAddress, factoryABI, signer);
  const createTx = await factoryContract.createPair(nftAddress, routerAddress, curveAddress, _fee);

  await createTx.wait();
  console.log("pool created");

  const _poolCount = await factoryContract.getPoolCount();
  const poolCount = (Number(_poolCount)) - 1;

  const pairAddress = await factoryContract.allPairs(poolCount);

  const nftContract = new ethers.Contract(nftAddress, nftABI, signer);

  const approveTx = await nftContract.setApprovalForAll(pairAddress, true);
  await approveTx.wait();
  console.log("contract approved");

  const strAmount = ethAmount.toString();
  const ethLiq = ethers.parseEther(strAmount);

  const pairContract = new ethers.Contract(pairAddress, pairABI, signer);
  const addLiqTx = await pairContract.addLiquidity(ids, userAddress, {value: ethLiq});

  await addLiqTx.wait();
  console.log("liquidity added");
}

export const buyNFT = async(nfts, chainId, signer) => {
    console.log(nfts, chainId, signer);
    const userAddress = await signer.getAddress();
    const collectionAddress = nfts[0].address;
    // sort all nfts to get their pool addresses
    const poolAddressMap = nfts.reduce((acc, obj) => {
        if (!acc[obj.poolAddress]) {
            acc[obj.poolAddress] = [];
        }
        acc[obj.poolAddress].push(obj.id);
        return acc;
    }, {});
    
    const result = Object.entries(poolAddressMap).map(([poolAddress, ids]) => ({
        ids,
        length: ids.length,
        poolAddress,
    }));
    console.log(result);

    // calculate the buy price for each pool
    const curveContract = new ethers.Contract(deploymentAddresses.curve[chainId], curveABI, signer);
    // run through a loop to calculate the price of all pools then sum up
    for (let i = 0; i < result.length; i++) {
        // get reserve0 and reserve1
        const pairContract = new ethers.Contract(result[i].poolAddress, pairABI, signer);
        const reserve0 = await pairContract.reserve0();
        const reserve1 = await pairContract.reserve1();
        console.log(reserve0, reserve1);

        const price = await curveContract.getBuyPriceSingle(result[i].length, reserve0, reserve1, result[i].poolAddress);
        console.log(price);

        const routerContract = new ethers.Contract(deploymentAddresses.router[chainId], routerABI, signer);
        const buyTx = await routerContract.swapETHforNFT(result[i].ids, result[i].poolAddress, userAddress, {value: price});
        await buyTx.wait();
        console.log("bought");
        const ids = result[i].ids

        const poolAddress = result[i].poolAddress
        const reqBody = {
          event: "Buy",
          chainId: chainId,
          item: ids[0],
          price: Number(ethers.formatEther(price)),
          from: userAddress,
          to: poolAddress,
          hash: buyTx.hash,
          address: collectionAddress
        }

        const response = await fetch(`${baseAPIURL}recordActivity/${poolAddress}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reqBody),
        });
    
        if (!response.ok) {
          throw new Error("Server Error");
        } else{
          console.log("done");
        }

    }
}

export const getCollections = async(chainId) => {
    // *use chainId
    const collections = fetch(`${baseAPIURL}getProtocolCollections?chainId=${chainId}`);
    // const collections = fetch(`http://localhost:3300/getProtocolCollections?chainId=80002`);
    return collections;
}

export const getCollection = async(chainId, collectionAddress) => {
  const collection = fetch(`${baseAPIURL}getCollection?chainId=${chainId}&collectionAddress=${collectionAddress}`);
  console.log(chainId, collectionAddress, collection);
  return collection;
}

export const getUserCollectionNFTs = async(chainId, collectionAddress, address) => {
  const nfts = fetch(`${baseAPIURL}getUserCollectionNFTs?userAddress=${address}&chainId=${chainId}&nftAddress=${collectionAddress}`);
  return nfts;
}

// export const fetchPrice = async(chainId) => {
//   const name = chainName[chainId];
//   const options = {
//     method: 'GET',
//     headers: { accept: 'application/json', 'x-cg-pro-api-key': 'CG-Dm7Z3kTRPVcQcBpQtfYQyPZn' }
//   };

//   try {
//       const response = await fetch(`https://pro-api.coingecko.com/api/v3/simple/price?ids=${name}&vs_currencies=usd`, options);
//       const _data = await response.json();
//       console.log(data);
//       return data;
//   } catch (err) {
//       console.error(err);
//   }
// };

export const getChainIcon = async(chainId) => {
  const icon = chainIcon[chainId];
  return icon;
}

export const getSellPrice = async(length, collectionAddress, chainId) => {
  const factoryAddress = deploymentAddresses.factory[chainId];
  const provider = new ethers.JsonRpcProvider(rpcUrls[chainId]);
  console.log(chainId, factoryAddress);

  const factoryContract = new ethers.Contract(factoryAddress, factoryABI, provider);

  let sellAmount = 0;

  try {
    const poolAddresses = await factoryContract.getPairs(collectionAddress);
    let tokens = length;

    for (let i = 0; i < poolAddresses.length; i++) {
      const pairContract = new ethers.Contract(poolAddresses[i], pairABI, provider);
      const _reserve0 = await pairContract.reserve0();
      const _reserve1 = await pairContract.reserve1();

      const reserve0 = Number(_reserve0);
      const reserve1 = Number(_reserve1);

      const amountOut = reserve1 * 0.7;
      
      const poolMax = (amountOut * reserve0) / (reserve1 - amountOut);
      const maxNFTs = Math.floor(poolMax);

      if (maxNFTs <= 0) {
        continue;
      }

      if (maxNFTs >= length) {
        const amountOut = ((reserve1 * length) / (reserve0 + length));
        sellAmount = sellAmount + amountOut;
      } else {
        tokens = tokens - maxNFTs;
        const amountOut = ((reserve1 * maxNFTs) / (reserve0 + maxNFTs));
        sellAmount = sellAmount + amountOut;
      }
    }

    return sellAmount;
  } catch (error) {
    console.log(error);
  }
}

export const sellNFT = async(tokenIds, nftAddress, chainId, signer) => {
  console.log("nft address", nftAddress);
  const route = await fetch(`${baseAPIURL}getSellRoute?tokenLength=${tokenIds.length}&nftAddress=${nftAddress}&chainId=${chainId}`);
  const routes = await route.json();
  const userAddress = await signer.getAddress();

  console.log(route, routes);
  try {
    const nftContract = new ethers.Contract(nftAddress, nftABI, signer);
    const routerContract = new ethers.Contract(deploymentAddresses.router[chainId], routerABI, signer);
    let ids = tokenIds;
    for (let i = 0; i < routes.length; i++) {
      // get id array by reducing
      const poolNFTs = ids.slice(0, routes[i].tokenLength);
      const poolIds = poolNFTs.map(obj => obj.id);
      ids = ids.slice(routes[i].tokenLength);

      const approvalTx = await nftContract.setApprovalForAll(routes[i].poolAddress, true);
      await approvalTx.wait();
      console.log("approved");
      
      console.log(poolIds, routes[i].poolAddress, userAddress);
      const swapTx = await routerContract.swapNFTforETH(poolIds, routes[i].poolAddress, userAddress);
      await swapTx.wait();
      console.log("swaped");
      const poolAddress = routes[i].poolAddress;
      const reqBody = {
        event: "Sell",
        chainId: chainId,
        item: poolIds[0],
        price: poolIds.length,
        from: userAddress,
        to: poolAddress,
        hash: swapTx.hash,
        address: nftAddress
      }

      const response = await fetch(`${baseAPIURL}recordActivity/${poolAddress}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
      });
  
      if (!response.ok) {
        throw new Error("Server Error");
      } else{
        console.log("done");
      }
    }
  } catch (error) {
  console.log(error);
  }
}

export const getAddAmount = async(length, chainId) => { // take in the pool address value
  const provider = new ethers.JsonRpcProvider(rpcUrls[chainId]);
  // get reserves
  const pairContract = new ethers.Contract("0x48bDf8aD32FAcE0Bb3887D4c771A184383864260", pairABI, provider);
  const _reserve0 = await pairContract.reserve0();
  const _reserve1 = await pairContract.reserve1();
  console.log(_reserve0, _reserve1);
  const reserve0 = Number(_reserve0);
  const reserve1 = Number(_reserve1);
  // calculate amountIn
  const amount = (reserve1 * length) / reserve0;
  console.log(length, amount);
  return amount;
}

// get user balance function
export const getUserBalance = async(chainId, userAddress) => {
  const provider = new ethers.JsonRpcProvider(rpcUrls[chainId]);

  const userBalance = await provider.getBalance(userAddress);

  return userBalance;
}

export const addLiquidity = async(nfts, chainId, nftAddress, signer) => { // take in poolAddress param
  const ids = nfts.map(nft => nft.id);
  const userAddress = await signer.getAddress();
  // get the eth value
  const amount = await getAddAmount(nfts.length, chainId);
  const liqAmount = BigInt(amount);
  // get the pool address
  const poolAddress = "0x48bDf8aD32FAcE0Bb3887D4c771A184383864260";
  // call function to perform transaction
  const nftContract = new ethers.Contract(nftAddress, nftABI, signer);

  const approveTx = await nftContract.setApprovalForAll(poolAddress, true);
  await approveTx.wait();
  console.log("contract approved");

  const pairContract = new ethers.Contract(poolAddress, pairABI, signer);
  const addLiqTx = await pairContract.addLiquidity(ids, userAddress, {value: liqAmount});

  await addLiqTx.wait();
  console.log("liquidity added");
}

export const getCoinPrice = async(chainId) => {
  const res = await fetch(`${baseAPIURL}getCoinPrice?chainId=${chainId}`);
 const data = await res.json();
 const price = data.price;
 return price;
}