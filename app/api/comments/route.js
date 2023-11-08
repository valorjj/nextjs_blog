/** @format */

import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

// GET ALL COMMENTS OF A POST
export const GET = async (req) => {
	const { searchParams } = new URL(req.url);
	const postSlug = searchParams.get("postSlug");

	try {
		const comments = await prisma.comment.findMany({
			// 
			where: {
				...(postSlug && { postSlug }),
			},
			include: { user: true },
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

// CREATE A COMMENT
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
		const comments = await prisma.comment.create({
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
