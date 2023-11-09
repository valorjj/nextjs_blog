/** @format */
'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

const DeleteButton = ({ slug }) => {
	const router = useRouter();
	const handleDelete = async (slug) => {
		try {
			await fetch(`/api/posts/${slug}`, {
				method: 'DELETE',
			});
			router.push('/');
		} catch (e) {
			console.log(e);
		}
	};

	return <button onClick={() => handleDelete(slug)}>Delete Button</button>;
};

export default DeleteButton;
