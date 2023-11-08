/** @format */

import React from "react";
import styles from "./cardlist.module.css";
import Pagination from "../pagination/Pagination";
import Image from "next/image";
import Card from "../card/Card";

const getData = async (page, cat) => {
	const response = await fetch(
		`http://localhost:3000/api/posts?page=${page}&cat=${cat || ""}`,
		{
			cache: "no-store",
		}
	);
	if (!response.ok) throw new Error("Failed");
	return response.json();
};

export default async function CardList({ page, cat }) {
	const { posts, count } = await getData(page, cat);

	const POST_PER_PAGE = 2;

	const hasPrev = POST_PER_PAGE * (page - 1) > 0;
	const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

	return (
		<div className={styles.container}>
			<h1 className={styles.title}>Recent Posts</h1>
			<div className={styles.posts}>
				{posts?.map((item) => (
					<Card
						item={item}
						key={item._id}
					/>
				))}
			</div>
			<Pagination
				page={page}
				hasPrev={hasPrev}
				hasNext={hasNext}
			/>
		</div>
	);
}
