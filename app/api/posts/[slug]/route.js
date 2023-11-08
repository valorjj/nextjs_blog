/** @format */

import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

// GET SINGLE POST
export const GET = async (req, { params }) => {
	const { slug } = params;
	try {
		// post <-> user 관계가 존재하기 때문에,
		// include: {user: true}
		const post = await prisma.post.findUnique({
			where: { slug },
			// 조회수 증가
			// [숙제] 무한정 증가하면 안되기에, 유저 세션 검사해서
			// 하루에 1번만 증가하도록 수정
			data: { views: { increment: 1 } },
			// User 정보 포함, @relation 관계 설정했기에 가능
			include: { user: true },
		});

		return new NextResponse(JSON.stringify(post, { status: 200 }));
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
