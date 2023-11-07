/** @format */

import React from "react";
import styles from "./loginPage.module.css";

export default function LoginPage() {
	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<div className={styles.socialButton}>Google</div>
				<div className={styles.socialButton}>Github</div>
				<div className={styles.socialButton}>Kakao</div>
                <div className={styles.socialButton}>Naver</div>
			</div>
		</div>
	);
}
