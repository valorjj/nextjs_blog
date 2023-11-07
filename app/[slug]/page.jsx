/** @format */

import React from "react";
import styles from "./singlepage.module.css";
import Menu from "@/components/menu/Menu";
import Image from "next/image";
import Comments from "@/components/comments/comments";

export default function SinglePage() {
	return (
		<div className={styles.container}>
			<div className={styles.infoContainer}>
				<div className={styles.textContainer}>
					<h1 className={styles.title}>
						Lorem ipsum dolor sit, amet consectetur adipisicing
						elit.
					</h1>
					<div className={styles.user}>
						<div className={styles.user}>
							<div className={styles.userImageContainer}>
								<Image
									src='/p1.jpeg'
									alt=''
									fill
									className={styles.avatar}
								/>
							</div>
							<div className={styles.userTextContainer}>
								<span className={styles.username}>
									Jeongjin Kim
								</span>
								<span className={styles.date}>
									- 2023.11.07
								</span>
							</div>
						</div>
					</div>
				</div>
				<div className={styles.imageContainer}>
					<Image
						src='/p1.jpeg'
						alt=''
						fill
						className={styles.image}
					/>
				</div>
			</div>
			<div className={styles.content}>
				<div className={styles.post}>
					<div className={styles.description}>
						<p>
							Lorem ipsum dolor sit, amet consectetur adipisicing
							elit. Veritatis ipsum non illo. Exercitationem nisi
							asperiores harum labore. Animi exercitationem
							tempora, repellat obcaecati dolore enim odio dicta
							molestias maiores nulla doloremque!
						</p>
						<h2>
							Lorem ipsum dolor sit amet consectetur adipisicing
							elit.
						</h2>
						<p>
							Lorem ipsum dolor sit, amet consectetur adipisicing
							elit. Veritatis ipsum non illo. Exercitationem nisi
							asperiores harum labore. Animi exercitationem
							tempora, repellat obcaecati dolore enim odio dicta
							molestias maiores nulla doloremque!
						</p>
						<p>
							Lorem ipsum dolor sit, amet consectetur adipisicing
							elit. Veritatis ipsum non illo. Exercitationem nisi
							asperiores harum labore. Animi exercitationem
							tempora, repellat obcaecati dolore enim odio dicta
							molestias maiores nulla doloremque!
						</p>
					</div>
					<div className={styles.comment}>
						<Comments />
					</div>
				</div>
				<Menu />
			</div>
		</div>
	);
}
