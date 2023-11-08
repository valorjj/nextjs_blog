/** @format */

import React from "react";
import styles from "./blogpage.module.css";
import CardList from "@/components/cardList/CardList";
import Menu from "@/components/menu/Menu";

export default function BlogPage({ searchParams }) {
	const page = parseInt(searchParams.page) || 1;
	const { cat } = searchParams;
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>{cat} blog</h1>
			<div className={styles.content}>
				<CardList
					page={page}
					cat={cat}
				/>
				<Menu />
			</div>
		</div>
	);
}
