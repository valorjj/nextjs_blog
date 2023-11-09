/** @format */
'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

const DeleteButton = ({ slug }) => {
	const router = useRouter();
	const handleDelete = async (slug) => {
		try {
			const res = await fetch(`/api/posts/${slug}`, {
				method: 'DELETE',
			});
			if (res.ok) router.push('/');
		} catch (e) {
			console.log(e);
		}
	};

	return <button onClick={() => handleDelete(slug)}>Delete this Post</button>;
};

export default DeleteButton;
