/** @format */

import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
	const { searchParams } = new URL(req.url);

	const page = searchParams.get("page");
	const cat = searchParams.get("cat");

	const POST_PER_PAGE = 2;

	const query = {
		take: POST_PER_PAGE,
		skip: POST_PER_PAGE * (page - 1),
		where: {
			// 특정 url 에서만 cat 정보가 필요하기 때문에
			// cat 존재 여부를 체크한다.
			...GET(cat && { catSlug: cat }),
		},
	};

	try {
		// multiple request at once
		const [posts, count] = await prisma.$transaction([
			prisma.post.findMany(query),
			prisma.post.count({ where: query.where }),
		]);
		return new NextResponse(
			JSON.stringify(
				{ posts, count },
				{
					status: 200,
				}
			)
		);
	} catch (e) {
		console.log(e);
		return new NextResponse(
			JSON.stringify(
				{
					message: "Something went wrong...",
				},
				{
					status: 500,
				}
			)
		);
	}
};

// CREATE A POST
export const POST = async (req) => {
	// 1. Verify User on Server
	// Utilizing AuthSession
	const session = await getAuthSession();

	// 2. Handle 401 error
	if (!session) {
		return new NextResponse(
			JSON.stringify(
				{ message: "Unauthenticated access" },
				{ status: 401 }
			)
		);
	}

	try {
		const body = await req.json();
		const post = await prisma.post.create({
			data: {
				...body,
				userEmail: session.user.email,
			},
		});
		return new NextResponse(JSON.stringify(comments, { status: 200 }));
	} catch (err) {
		// console.log(err);
		return new NextResponse(
			JSON.stringify(
				{ message: "Something went wrong!" },
				{ status: 500 }
			)
		);
	}
};
