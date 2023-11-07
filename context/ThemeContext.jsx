/** @format */
"use client";
import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

/*
 * next.js 는 default 로 server-side rendering 을 하려고 한다.
 * 여기선 '밝은 테마', '어두운 테마' 를 local storage 에 저장해서 사용하려고 하는데,
 * 이는 client side rendering 이므로 문제가 발생할 수 있다.
 * 따라서
 */
const getFromLocalStorgate = () => {
	if (typeof window !== "undefined") {
		const value = localStorage.getItem("theme");
		// if value is empty, make it 'light'
		return value || "light";
	}
};

export const ThemeContextProvider = ({ children }) => {
	const [theme, setTheme] = useState(() => {
		return getFromLocalStorgate();
	});

	const toggle = () => {
		setTheme(theme === "light" ? "dark" : "light");
	};

	useEffect(() => {
		localStorage.setItem("theme", theme);
	}, [theme]);

	return (
		<ThemeContext.Provider value={{ theme, toggle }}>
			{children}
		</ThemeContext.Provider>
	);
};
