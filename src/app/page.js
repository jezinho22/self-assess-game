import Image from "next/image";
import UsingContext from "@/components/usingContext";
import SparkBar from "@/components/SparkBar";
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/utilities";
import { ClerkProvider, SignedIn } from "@clerk/nextjs";

export default async function Home() {
	const { userId } = await auth();

	const response =
		await db.query(`SELECT u.username, SUM(best_answers.points) AS total_score, l.level
			FROM users u
			JOIN (
				SELECT a.clerkid, a.question_id, MAX(a.points) AS points
				FROM answers a
				WHERE a.clerkid = '${userId}'
				GROUP BY a.clerkid, a.question_id
			) AS best_answers ON u.clerkid = best_answers.clerkid
			JOIN questions q ON best_answers.question_id = q.id
			JOIN level l ON q.level_id = l.id
			GROUP BY u.username, l.level`);
	const data = response.rows;
	const score = data.reduce((agg, curr) => {
		return {
			total_score: Number(agg.total_score) + Number(curr.total_score),
		};
	});
	score.username = data[0].username;

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
