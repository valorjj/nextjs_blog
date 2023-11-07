/** @format */

import React from "react";
import styles from "./footer.module.css";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
	return (
		<div className={styles.container}>
			<div className={styles.info}>
				<div className={styles.logo}>
					<Image
						src='/logo.png'
						alt=''
						width={50}
						height={50}
					/>
					<h1 className={styles.logoText}>JJ blog</h1>
				</div>
				<p className={styles.desc}>
					Lorem ipsum dolor sit, amet consectetur adipisicing elit.
					Suscipit quia rem nisi assumenda non quaerat alias
					voluptates, molestiae vel. Error quibusdam dolorem molestiae
					hic architecto voluptatem vitae temporibus, facere ipsa?
				</p>
				<div className={styles.icons}>
					<Image
						src='/facebook.png'
						alt=''
						width={18}
						height={18}
					/>
					<Image
						src='/youtube.png'
						alt=''
						width={18}
						height={18}
					/>
				</div>
			</div>
			<div className={styles.links}>
				<div className={styles.list}>
					<span className={styles.listTitle}>Links</span>
					<Link href='/'>Homepage</Link>
					<Link href='/'>Blog</Link>
					<Link href='/'>About</Link>
					<Link href='/'>Contact</Link>
				</div>
				<div className={styles.list}>
					<span className={styles.listTitle}>Tags</span>
					<Link href='/'>Coding</Link>
					<Link href='/'>Travel</Link>
					<Link href='/'>Styles</Link>
					<Link href='/'>Fashion</Link>
				</div>
				<div className={styles.list}>
					<span className={styles.listTitle}>Social</span>
					<Link href='/'>Instragram</Link>
					<Link href='/'>Youtube</Link>
					<Link href='/'>Facebook</Link>
					<Link href='/'>Github</Link>
				</div>
			</div>
		</div>
	);
}
