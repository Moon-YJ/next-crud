'use client';
import { useState, useEffect } from 'react';
import styles from './detail.module.scss';
import clsx from 'clsx';

export default function PostDetail({ params }) {
	const { id } = params;
	const [PostEl, setPostEl] = useState(null);

	const handleDelete = () => {
		fetch(`/api/requestPost/${id}`, {
			method: 'DELETE',
		})
			.then((data) => data.json())
			.then((json) => {
				console.log(json);
				setPostEl(json.result);
			});
	};

	useEffect(() => {
		fetch(`/api/requestPost/${id}`)
			.then((data) => data.json())
			.then((json) => {
				console.log(json);
				setPostEl(json.result);
			});
	}, [id]);

	return (
		<section className={clsx(styles.detail)}>
			<article>
				<h2>{PostEl?.title}</h2>
				<p>{PostEl?.content}</p>
			</article>
			<nav>
				<button>Edit</button>
				<button onClick={handleDelete}>Delete</button>
			</nav>
		</section>
	);
}
