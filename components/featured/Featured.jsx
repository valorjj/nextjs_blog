/** @format */

import React from 'react';
import styles from './featured.module.css';
import Image from 'next/image';

export default function Featured() {
	return (
		<div className={styles.container}>
			<h1 className={styles.title}>
				<b>환영합니다!</b>
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
					<h1 className={styles.postTitle}>
						Next.js 학습용 교보재입니다.
					</h1>
					<p className={styles.postDesc}>감사합니다.</p>
					{/* <button className={styles.button}>Read More</button> */}
				</div>
			</div>
		</div>
	);
}
