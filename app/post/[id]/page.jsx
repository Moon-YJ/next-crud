'use client';
import { useState, useEffect } from 'react';
import styles from './detail.module.scss';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

export default function PostDetail({ params }) {
	const { id } = params;
	const router = useRouter();
	const [PostEl, setPostEl] = useState(null);

	// 순서 1 - 삭제할 글 번호를 인수로 받아서 DELETE 메서드 방식으로 서버쪽에 요청보내는 함수 정의
	const handleDelete = (id) => {
		if (!window.confirm('정말 글을 삭제하겠습니까?')) return;

		fetch(`/api/requestPost/${id}`, { method: 'DELETE' })
			.then((res) => {
				if (res.ok) {
					alert('글삭제 성공');
					router.push('/post');
				} else {
					alert('글삭제 실패');
				}
			})
			.catch((err) => {
				console.log(err);
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
				{/* 순서 2 - params로 전달받은 글 고유번호를 인수로 전달해서 호출 */}
				<button onClick={() => handleDelete(id)}>Delete</button>
			</nav>
		</section>
	);
}
