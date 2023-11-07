/** @format */

import React from "react";
import styles from "./featured.module.css";
import Image from "next/image";

export default function Featured() {
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>
				<b>반갑습니다!</b>
			</h1>
			<div className={styles.post}>
				<div className={styles.imgContainer}>
					<Image
						className={styles.image}
						src='/p1.jpeg'
						alt=''
						fill
					></Image>
				</div>
				<div className={styles.textContainer}>
					<h1 className={styles.postTitle}>title</h1>
					<p className={styles.postDesc}>
						Lorem, ipsum dolor sit amet consectetur adipisicing
						elit. Aut officia, modi ipsa ex repellendus numquam
						ratione ducimus, sit atque totam laboriosam autem
						adipisci molestiae nihil, enim inventore placeat
						consectetur optio.
					</p>
					<button className={styles.button}>Read More</button>
				</div>
			</div>
		</div>
	);
}
