/** @format */

import React from "react";
import styles from "./categorylist.module.css";
import Link from "next/link";
import Image from "next/image";

export default function CategoryList() {
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>인기 카테고리</h1>
			<div className={styles.categories}>
				<Link
					href='/blog?cat=style'
					className={`${styles.category} ${styles.style}`}
				>
					<Image
						src='/style.png'
						alt=''
						width={32}
						height={32}
						className={styles.image}
					/>
					style
				</Link>

				<Link
					href='/blog?cat=travel'
					className={`${styles.category} ${styles.travel}`}
				>
					<Image
						src='/travel.png'
						alt=''
						width={32}
						height={32}
						className={styles.image}
					/>
					travel
				</Link>

				<Link
					href='/blog?cat=food'
					className={`${styles.category} ${styles.food}`}
				>
					<Image
						src='/food.png'
						alt=''
						width={32}
						height={32}
						className={styles.image}
					/>
					food
				</Link>

				<Link
					href='/blog?cat=coding'
					className={`${styles.category} ${styles.coding}`}
				>
					<Image
						src='/coding.png'
						alt=''
						width={32}
						height={32}
						className={styles.image}
					/>
					coding
				</Link>
			</div>
		</div>
	);
}
