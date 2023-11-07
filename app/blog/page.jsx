/** @format */

import React from "react";
import styles from "./blogpage.module.css";
import CardList from "@/components/cardList/CardList";
import Menu from "@/components/menu/Menu";

export default function BlogPage() {
	return (
		<div className={styles.container}>
			<h1 className={styles.title}></h1>
			<div className={styles.content}>
				<CardList />
				<Menu />
			</div>
		</div>
	);
}
