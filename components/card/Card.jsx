/** @format */

import React from "react";
import styles from "./card.module.css";
import Image from "next/image";
import Link from "next/link";

export default function Card() {
	return (
		<div className={styles.container}>
			<div className={styles.imgContainer}>
				<Image
					className={styles.image}
					src='/p1.jpeg'
					alt=''
					fill
				/>
			</div>
			<div className={styles.textContainer}>
				<div className={styles.detail}>
					<span className={styles.date}>2023.11.06 - </span>
					<span className={styles.category}>CODING</span>
				</div>
				<Link href='/'>
					<h1>this is just a test title</h1>
				</Link>
				<p className={styles.desc}>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
					ratione eligendi inventore nesciunt ad doloremque explicabo
					iste nemo quis eveniet, iure ea similique nisi reprehenderit
					accusantium voluptatem exercitationem ullam. Sunt!
				</p>
				<Link
					href='/'
					className={styles.link}
				>
					Read More
				</Link>
			</div>
		</div>
	);
}
