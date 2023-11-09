/** @format */
"use client";

import React from "react";

const DeleteButton = ({ slug }) => {
	const handleDelete = async (slug) => {
		console.log(slug);
		try {
		} catch (e) {}
	};

	return <button onClick={() => handleDelete(slug)}>Delete Button</button>;
};

export default DeleteButton;
