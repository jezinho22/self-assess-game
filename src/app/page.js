import Image from "next/image";
import UsingContext from "@/components/usingContext";
import SparkBar from "@/components/SparkBar";
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/utilities";
import { ClerkProvider, SignedIn } from "@clerk/nextjs";

export default async function Home() {
	const { userId } = await auth();
	const response = await db.query(`SELECT 
		users.username, SUM(answers.points) AS total_score
		FROM answers 
		JOIN users ON answers.clerkid = users.clerkid
		WHERE users.clerkid = '${userId}'
		GROUP BY users.username;`);
	const score = response.rows[0];
	console.log("Score: ", score);

	return (
		<>
			<p>Huge splash page</p>
			<SignedIn>
				<p>Cool. Youre signed in</p>
				<SparkBar score={score} />
			</SignedIn>
		</>
	);
}
