/** @format */

import React from "react";
import styles from "./comments.module.css";
import { Link } from "next/link";
import Image from "next/image";

export default function Comments() {
	const status = "authenticated";
	return (
		<div className={styles.container}>
			<h1 className={styles.title}></h1>
			{status === "authenticated" ? (
				<div className={styles.write}>
					<textarea
						placeholder='write a comment...'
						className={styles.input}
					></textarea>
					<button className={styles.button}>Send</button>
				</div>
			) : (
				<Link href='/login'>Login to write a comment</Link>
			)}
			<div className={styles.comments}>
				<div className={styles.comment}>
					<div className={styles.user}>
						<Image
							src='/p1.jpeg'
							alt=''
							className={styles.image}
							width={50}
							height={50}
						/>
						<div className={styles.userInfo}>
							<span className={styles.username}>
								Jeongjin Kim
							</span>
							<span className={styles.data}> - 2023.11.07</span>
						</div>
					</div>
					<p className={styles.desc}>
						Lorem ipsum dolor sit, amet consectetur adipisicing
						elit. Vel, rem ullam. Molestias distinctio natus eum
						maiores ad repellendus. Alias harum fugit similique
						neque eaque tempore aliquid error quod rerum non.
					</p>
				</div>
			</div>
		</div>
	);
}
