/** @format */
'use client';

import styles from './loginPage.module.css';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
	const { status } = useSession();
	const router = useRouter();

	// [숙제] 로딩 페이지 스타일 만들기
	if (status === 'loading') {
		return <div className={styles.loading}>Now loading...</div>;
	}

	// 로그인에 성공한 경우, 홈으로 이동
	if (status === 'authenticated') {
		router.push('/');
	}

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<div
					className={styles.socialButton}
					onClick={() => signIn('google')}
				>
					Google
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
