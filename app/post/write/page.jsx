'use client';

import { useState } from 'react';
import styles from './write.module.scss';
import clsx from 'clsx';

export default function Write() {
	const [Post, setPost] = useState({ title: '', content: '' });
	console.log(Post);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setPost({ ...Post, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await fetch('/api/requestPost', {
			method: 'POST',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify(Post),
		});

		if (response.ok) {
			console.log(response);
			alert('글 저장에 성공했습니다.');
		} else {
			console.log(response);
			alert('글 저장에 실패했습니다.');
		}
	};

	return (
		<div className={clsx(styles.write)}>
			<h1>Write Post</h1>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					placeholder='title'
					name='title'
					value={Post.title}
					onChange={handleChange}
				/>
				<textarea
					name='content'
					cols='30'
					rows='3'
					value={Post.content}
					onChange={handleChange}
				></textarea>
				<button>저장</button>
			</form>
		</div>
	);
}
