/** @format */

import React from "react";
import styles from "./menuCategories.module.css";
import Link from "next/link";

export default function MenuCategories() {
	return (
		<div className={styles.categoryList}>
			<Link
				href='/blog?cat=style'
				className={`${styles.categoryItem} ${styles.style}`}
			>
				style
			</Link>
			<Link
				href='/blog?cat=food'
				className={`${styles.categoryItem} ${styles.food}`}
			>
				food
			</Link>
			<Link
				href='/blog?cat=coding'
				className={`${styles.categoryItem} ${styles.coding}`}
			>
				coding
			</Link>
		</div>
	);
}
