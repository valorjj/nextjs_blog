/** @format */
// useContext 훅을 사용하기 때문에 client side rendering 임을 명시한다.
"use client";

import React, { useContext } from "react";
import styles from "./themeToggle.module.css";
import Image from "next/image";
import { ThemeContext } from "@/context/ThemeContext";

export default function ThemeToggle() {
	const { theme, toggle } = useContext(ThemeContext);

	return (
		<div
			className={styles.container}
			onClick={toggle}
			style={
				theme === "dark"
					? { backgroundColor: "white" }
					: { backgroundColor: "#0f172a" }
			}
		>
			<Image
				src='/moon.png'
				alt=''
				width={14}
				height={14}
			></Image>
			<div
				className={styles.ball}
				style={
					theme === "dark"
						? { left: 1, backgrounColor: "#0f172a" }
						: { right: 1, backgroundColor: "white" }
				}
			></div>
			<Image
				src='/sun.png'
				alt=''
				width={14}
				height={14}
			></Image>
		</div>
	);
}
