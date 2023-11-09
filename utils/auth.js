/** @format */
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { getServerSession } from 'next-auth';
import prisma from './connect';

export const authOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		// GithubProvider({
		// 	clientId: process.env.GITHUB_ID,
		// 	clientSecret: process.env.GITHUB_SECRET,
		// }),

		// vercel 배포 시 문제 발생
		
		GoogleProvider({
			clientId: process.env.GOOGLE_ID,
			clientSecret: process.env.GOOGLE_SECRET,
		}),
	],
};

export const getAuthSession = () => getServerSession(authOptions);
