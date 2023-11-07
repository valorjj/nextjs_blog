/** @format */
// useContext 훅을 사용하기 때문에 client side rendering 임을 명시한다.
"use client";

import { ThemeContext } from "@/context/ThemeContext";
import React, { useContext, useEffect, useState } from "react";

export default function ThemeProvider({ children }) {
	const { theme } = useContext(ThemeContext);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (mounted) {
		return <div className={theme}>{children}</div>;
	}
}
