"use client";
import Image from "next/image";
import Button from "../ui/button";
import TokenTag from "../ui/tokenTag";
import { Icon } from "@iconify/react";
import { useAccount } from "wagmi";
import { useState, useEffect } from "react";
import { buyNFT, getChainIcon, sellNFT } from "@/utils/app";
import { useEthersSigner } from "@/utils/adapter";

export default function Sell({ selectedNFTs, collectionName, nftIcon, sellAmount, collectionAddress }) {
    const { address, isConnected, chain, chainId } = useAccount();
    const signer = useEthersSigner();
    const [userAddress, setUserAddress] = useState(" ");
    const [currency, setCurrency] = useState(" ");
    const [chainIcon, setChainIcon] = useState("/matic.png");

    useEffect(() => {
        if (isConnected) {
          (async () => {
            const add = address.slice(0, 6) + "..." + address.slice(-3);
            const icon = await getChainIcon(chainId);
            setCurrency(chain.nativeCurrency.name);
            setUserAddress(add);
            setChainIcon(icon);
          })();
        }
    }, [isConnected]);

    const sellNFTs = async() => {
        await sellNFT(selectedNFTs, collectionAddress, chainId, signer);
        console.log("successfully");
    }
    return (
        <div>
            <h2 className="text-2xl">Swap</h2>
            <p className="text-[10px] mt-4 mb-16">
                ~ select nft you wish to sell from your wallet, proceed to swap
                to token
            </p>
            <div className="bg-white/5 rounded-xl border-dashed border border-grey mb-5 px-6 py-4 flex justify-between">
                <div className="flex flex-col justify-between text-center">
                    <p>from</p>
                    <div className="my-5">
                        <p className="mt-5 mb-3 text-xl">{selectedNFTs.length} {collectionName}</p>
                    </div>
                    <TokenTag src={nftIcon} />
                </div>
                <div>
                    <Icon icon="octicon:arrow-right-16" />
                </div>
                <div className="flex flex-col justify-between">
                    <p className="text-center">to</p>
                    <div className="my-5 text-center">
                        <p className="text-xl">{sellAmount} {currency}</p>
                    </div>
                    <TokenTag src={chainIcon} />
                </div>
            </div>

            <div className="bg-white/5 rounded-xl border-dashed border border-grey py-5 flex justify-center">
                <div>
                    <div className="flex items-center space-x-4 mb-6 w-fit mx-auto ">
                        <div className="flex flex-col justify-center items-center">
                            <div className="w-6 h-6 rounded-full border-[5px] border-[#98D076] bg-white"></div>
                            <div className="h-4 border border-dashed" />
                            <div className="w-6 h-6 rounded-full border-[5px] border-[#B06ECF] bg-white"></div>
                        </div>

                        <div>
                            <div className="flex space-x-3 text-xs items-center mb-5">
                                <p>Router</p>
                                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-500"></div>
                                {/* Replace with wallet addresss */}
                                <p>0xe9c...26Ca</p>
                            </div>

                            <div className="flex space-x-3 text-xs items-center">
                                <p>user</p>
                                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-500"></div>
                                {/* Replace with wallet addresss */}
                                <p>{userAddress}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-start mb-5 w-full justify-center space-x-5">
                    <div className="flex flex-col items-center space-y-3">
                            <img
                                src={nftIcon}
                                width="40"
                                height="40"
                                alt="Token icon"
                            />

                            {/* TODO: replace with actual figures */}
                            <p>{selectedNFTs.length} {collectionName}</p>
                        </div>
                        <div>
                            <Icon
                                icon="ei:arrow-right"
                                width="27"
                                height="27"
                                className="mt-4"
                            />
                        </div>
                        <div className="flex flex-col items-center space-y-3">
                            <img
                                src={chainIcon}
                                width="40"
                                height="40"
                                alt="Token icon"
                            />
  
                            {/* TODO: replace with actual figures */}
                            <p>{sellAmount} {currency}</p>
                        </div>
                    </div>
                    <p className="mb-5">~swap {selectedNFTs.length} {collectionName} for {sellAmount} {currency}</p>
                    <div className="w-fit mx-auto">
                        <Button text="Proceed" clickHandler={sellNFTs}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
