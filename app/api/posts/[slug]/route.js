/** @format */

import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

// GET SINGLE POST
export const GET = async (req, { params }) => {
	const { slug } = params;

	try {
		const post = await prisma.post.update({
			where: { slug },
			// TODO: 세션 조회해서, 조회수가 연속으로 올라가지 않도록 수정
			data: { views: { increment: 1 } },
			include: { user: true },
		});

		return new NextResponse(JSON.stringify(post, { status: 200 }));
	} catch (err) {
		console.log(err);
		return new NextResponse(
			JSON.stringify(
				{ message: "Something went wrong!" },
				{ status: 500 }
			)
		);
	}
};
