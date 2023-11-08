/** @format */
"use client";

import Image from "next/image";
import styles from "./writePage.module.css";
import React, { use, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from "firebase/storage";
import { app } from "@/utils/firebase";

const WritePage = () => {
	const { status } = useSession();
	const router = useRouter();
	const [file, setFile] = useState(null);
	const [open, setOpen] = useState(false);
	const [media, setMedia] = useState("");
	const [value, setValue] = useState("");
	const [title, setTitle] = useState("");
	const [catSlug, setCatSlug] = useState("");

	// file 의 상태가 바뀌면 (파일이 업로드되면)
	useEffect(() => {
		const storage = getStorage(app);
		const upload = () => {
			// 유니크한 이름 부여
			const name = new Date().getTime + file.name;
			const storageRef = ref(storage, name);

			const uploadTask = uploadBytesResumable(storageRef, file);
			uploadTask.on(
				"state_changed",
				(snapshot) => {
					const progress =
						(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log("Upload is " + progress + "% done");
					switch (snapshot.state) {
						case "paused":
							console.log("Upload is paused");
							break;
						case "running":
							console.log("Upload is running");
							break;
					}
				},
				(error) => {},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then(
						(downloadURL) => {
							setMedia(downloadURL);
						}
					);
				}
			);
		};

		file && upload();
	}, [file]);

	// [숙제] 로딩 페이지 스타일 만들기
	if (status === "loading") {
		return <div className={styles.loading}>Now loading...</div>;
	}

	if (status === "unauthenticated") {
		router.push("/");
	}

	// 한글 입력 시 값이 제대로 안들어감
	// -> 한글 수정
	const slugify = (str) =>
		str
			.toLowerCase()
			.trim()
			.replace(/[^ㄱ-ㅎㅏ-ㅣ가-헿\w\s-]+/g, "")
			.replace(/[\s_-]+/g, "-")
			.replace(/^-+|-+$/g, "");

	const handleSubmit = async () => {
		const res = await fetch("/api/posts", {
			method: "POST",
			body: JSON.stringify({
				title,
				desc: value,
				img: media,
				slug: slugify(title),
				catSlug: catSlug || "coding",
			}),
		});

		console.log(res);
	};

	return (
		<div className={styles.container}>
			<input
				type='text'
				placeholder='Title'
				className={styles.input}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<select
				className={styles.select}
				onChange={(e) => setCatSlug(e.target.value)}
			>
				<option value='style'>style</option>
				<option value='fashion'>fashion</option>
				<option value='food'>food</option>
				<option value='culture'>culture</option>
				<option value='travel'>travel</option>
				<option value='coding'>coding</option>
			</select>
			<div className={styles.editor}>
				<button
					className={styles.button}
					onClick={() => setOpen(!open)}
				>
					<Image
						src='/plus.png'
						alt=''
						width={16}
						height={16}
					/>
				</button>
				{open && (
					<div className={styles.add}>
						<input
							type='file'
							id='image'
							onChange={(e) => setFile(e.target.files[0])}
							style={{ display: "none" }}
						/>

						<button className={styles.addButton}>
							<label htmlFor='image'>
								<Image
									src='/image.png'
									alt=''
									width={16}
									height={16}
								/>
							</label>
						</button>

						<button className={styles.addButton}>
							<Image
								src='/external.png'
								alt=''
								width={16}
								height={16}
							/>
						</button>
						<button className={styles.addButton}>
							<Image
								src='/video.png'
								alt=''
								width={16}
								height={16}
							/>
						</button>
					</div>
				)}
				<ReactQuill
					theme='bubble'
					value={value}
					onChange={setValue}
					placeholder='Tell your story'
					className={styles.textArea}
				/>
			</div>
			<button
				className={styles.publish}
				onClick={handleSubmit}
			>
				Publish
			</button>
		</div>
	);
};

export default WritePage;
