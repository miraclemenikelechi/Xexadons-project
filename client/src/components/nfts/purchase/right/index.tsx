"use client";
import "./index.scss";

import { NFT } from "@/components/reusable";
// import { ContextWrapper } from "@/hooks";
import { commonProps } from "@/types";

// export function PurchaseNFTRight({ group }: commonProps) {
// 	const {
// 		nftContext: { nftAddress, setCollection, setCollectionName },
// 	} = ContextWrapper();

// 	const { chainId, status } = useAccount();

// 	const _chainId = status === "connected" ? chainId : 80002;

// 	const { data, isLoading, isError, error } = useQuery({
// 		queryKey: ["nftCollections", _chainId, nftAddress],
// 		queryFn: async () => getNFTCollections(_chainId, nftAddress),
// 	});

// 	useEffect(() => {
// 		data && (setCollection(data), setCollectionName(data.NFTs[0].name));
// 	}, [data, setCollection, setCollectionName]);

// 	switch (true) {
// 		case isLoading:
// 			return <ContentWrapper>Loading...</ContentWrapper>;

// 		case isError:
// 			return (
// 				<ContentWrapper>
// 					An error occurred: {error?.message}
// 				</ContentWrapper>
// 			);

// 		case data !== null || undefined:
// 			const { pools, NFTs } = data;

// 			return (
// 				<ContentWrapper>
// 					<div>
// 						<h2>Select NFTs</h2>
// 						<div>
// 							<span>Pools</span>
// 							<span>{pools.length}</span>
// 						</div>
// 					</div>
// 					<section>
// 						{NFTs.map(() => {
// 							return <NFT />;
// 						})}
// 					</section>
// 				</ContentWrapper>
// 			);
// 	}

// 	function ContentWrapper({ children }: { children: ReactNode }) {
// 		return <section className={`${group}__right`}>{children}</section>;
// 	}
// }

type PurchaseNFTRightProps = commonProps & {
	activeTab: string;
};

export function PurchaseNFTRight({ group, activeTab }: PurchaseNFTRightProps) {
	return (
		<section className={`${group}`}>
			<div className={`${group}__wrapper`}>
				<div className={`${group}__top`}>
					{activeTab === "buy" ? (
						<>
							<h2>select nfts</h2>

							<div>
								<span>pools</span>
								<i>2</i>
							</div>
						</>
					) : (
						<>
							<h2>my nfts</h2>
						</>
					)}
				</div>

				<section className={`${group}__bottom`}>
					<div>
						{/* eslint-disable-next-line no-unused-vars */}
						{[...Array(40)].map((value, index) => (
							<NFT key={index} />
						))}
					</div>
				</section>
			</div>
		</section>
	);
}
