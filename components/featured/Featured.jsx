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
						src='/a.png'
						alt=''
						fill
					></Image>
				</div>
				<div className={styles.textContainer}>
					<h1 className={styles.postTitle}>
						저만의 작은 블로그입니다.
					</h1>
					<p className={styles.postDesc}>
						매일 1% 발전하려고 노력하고있습니다.
					</p>
					{/* <button className={styles.button}>Read More</button> */}
				</div>
			</div>
		</div>
	);
}
