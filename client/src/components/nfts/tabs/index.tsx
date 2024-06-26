"use client";

import "./index.scss";

import { useState } from "react";

import { DropDown } from "@/assets";

type TabsProps = {
	handleTabClick: Function;
	activeTab: string;
};

type poolProps = {
	isDropDownOpen: boolean;
	activePoolOption: string;
};

type poolDropDownProps = {
	handlePoolTabClick: Function;
};

export function Tabs({ handleTabClick, activeTab }: TabsProps) {
	const [poolOptions, setPoolOptions] = useState<poolProps>({
		isDropDownOpen: false,
		activePoolOption: "liquidity",
	});

	function handlePoolTabClick(option: string) {
		setPoolOptions({
			isDropDownOpen: false,
			activePoolOption: option,
		});

		handleTabClick(option);
	}

	return (
		<section className="nft_tabs">
			<div className="nft_tabs__wrapper">
				<button
					className={`nft_tabs__button`}
					onClick={() => {
						handleTabClick("buy");

						setPoolOptions({
							...poolOptions,
							isDropDownOpen: false,
						});
					}}
				>
					<span>buy</span>
				</button>

				<button
					className={`nft_tabs__button`}
					onClick={() => {
						handleTabClick("sell");

						setPoolOptions({
							...poolOptions,
							isDropDownOpen: false,
						});
					}}
				>
					<span>sell</span>
				</button>

				<button
					className="nft_tabs__button"
					onClick={() => {
						setPoolOptions({
							...poolOptions,
							isDropDownOpen: !poolOptions.isDropDownOpen,
						});
					}}
				>
					<span>pool</span> <i>{DropDown({ color: "white" })}</i>
					{poolOptions.isDropDownOpen && (
						<>
							{poolDropDown({
								handlePoolTabClick,
							})}
						</>
					)}
				</button>

				<span className={`nft_tabs__indicator ${activeTab}`}></span>
			</div>
		</section>
	);
}

function poolDropDown({ handlePoolTabClick }: poolDropDownProps) {
	return (
		<div className="nft_tabs__dropdown">
			<ul>
				<li onClick={() => handlePoolTabClick("liquidity")}>
					<span>liquidity</span>
				</li>

				<li onClick={() => handlePoolTabClick("create")}>
					<span>create</span>
				</li>
			</ul>
		</div>
	);
}
