/** @format */

// import { PrismaClient } from "@prisma/client";
import { PrismaClient } from "/prisma/generated/client";
let prisma;

if (process.env.NODE_ENV === "production") {
	prisma = new PrismaClient();
} else {
	if (!global.prisma) {
		global.prisma = new PrismaClient();
	}
	prisma = global.prisma;
}

export default prisma;
