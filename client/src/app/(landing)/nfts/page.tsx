"use client";

import { ReactNode } from "react";

import { PurchaseNFTRight } from "@/components/nfts/purchase/right";
import { useTabSwitcher } from "@/hooks";
import {
	GlassyBackground,
	renderLeftContent,
	renderRightContent,
} from "@/views";

type activeTabProps = Record<string, ReactNode>;

export default function NFTs() {
	const { activeTab, handleTabClick, tabIsActive } = useTabSwitcher("buy");

	const activeTabContent: activeTabProps = {
		buy: (
			<PurchaseNFTRight
				group="buy_right"
				activeTab={activeTab}
			/>
		),
		sell: (
			<PurchaseNFTRight
				group="sell_right"
				activeTab={activeTab}
			/>
		),
		liquidity: <>deposit</>,
		withdraw: <>withdraw</>,
		create: <>create</>,
	};

	function renderTabContent(): ReactNode {
		return activeTabContent[activeTab] || null;
	}

	return (
		<>
			<div className="nfts__wrapper">
				<GlassyBackground
					background="#231926"
					color1="#DED620"
					color2="#B2FDB6"
					deg={145}
				>
					{renderLeftContent({
						activeTab,
						handleTabClick,
						tabIsActive,
					})}
					{renderRightContent({ renderTabContent })}
				</GlassyBackground>
			</div>
		</>
	);
}
