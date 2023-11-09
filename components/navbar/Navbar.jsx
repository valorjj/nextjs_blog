/** @format */

import React from 'react';
import styles from './navbar.module.css';
import Image from 'next/image';
import Link from 'next/link';
import ThemeToggle from '../themeToggle/ThemeToggle';
import Auth from '../auth/AuthLinks';

export default function Navbar() {
	return (
		<div className={styles.container}>
			<div className={styles.social}>
				{/* <Image
					src='/facebook.png'
					alt='facebook'
					width={24}
					height={24}
				/>
				<Image
					src='/youtube.png'
					alt='youtube'
					width={24}
					height={24}
				/> */}
			</div>
			<Link
				href='/'
				className={styles.bloglink}
			>
				<div className={styles.logo}>JJ blog</div>
			</Link>

			<div className={styles.links}>
				<ThemeToggle />
				<Link
					href='/'
					className={styles.link}
				>
					HomePage
				</Link>
				<Link
					href='/'
					className={styles.link}
				>
					About
				</Link>
				<Auth />
			</div>
		</div>
	);
}
