/** @format */

import React from "react";
import styles from "./menuPosts.module.css";
import Link from "next/link";
import Image from "next/image";

export default function MenuPosts({ withImage }) {
	return (
		<div className={styles.items}>
			<Link
				href='/'
				className={styles.item}
			>
				{withImage && (
					<div className={styles.imgContainer}>
						<Image
							src='/p1.jpeg'
							alt=''
							fill
							className={styles.image}
						></Image>
					</div>
				)}
				<div className={styles.textContainer}>
					<span className={`${styles.category} ${styles.travel}`}>
						Travel
					</span>
					<h3 className={styles.postTitle}>
						Lorem ipsum dolor, sit amet consectetur adipisicing
						elit.
					</h3>
					<div className={styles.details}>
						<span className={styles.username}>Jeongjin Kim</span>
						<span className={styles.date}> - 2023.11.06</span>
					</div>
				</div>
			</Link>

			<Link
				href='/'
				className={styles.item}
			>
				{withImage && (
					<div className={styles.imgContainer}>
						<Image
							src='/p1.jpeg'
							alt=''
							fill
							className={styles.image}
						></Image>
					</div>
				)}
				<div className={styles.textContainer}>
					<span className={`${styles.category} ${styles.food}`}>
						Food
					</span>
					<h3 className={styles.postTitle}>
						Lorem ipsum dolor, sit amet consectetur adipisicing
						elit.
					</h3>
					<div className={styles.details}>
						<span className={styles.username}>Jeongjin Kim</span>
						<span className={styles.date}> - 2023.11.06</span>
					</div>
				</div>
			</Link>

			<Link
				href='/'
				className={styles.item}
			>
				{withImage && (
					<div className={styles.imgContainer}>
						<Image
							src='/p1.jpeg'
							alt=''
							fill
							className={styles.image}
						></Image>
					</div>
				)}

				<div className={styles.textContainer}>
					<span className={`${styles.category} ${styles.coding}`}>
						Coding
					</span>
					<h3 className={styles.postTitle}>
						Lorem ipsum dolor, sit amet consectetur adipisicing
						elit.
					</h3>
					<div className={styles.details}>
						<span className={styles.username}>Jeongjin Kim</span>
						<span className={styles.date}> - 2023.11.06</span>
					</div>
				</div>
			</Link>
		</div>
	);
}
