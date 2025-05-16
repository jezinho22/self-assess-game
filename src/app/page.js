import Image from "next/image";
import UsingContext from "@/components/usingContext";
import SparkBar from "@/components/SparkBar";
import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/utils/utilities";
import {
	ClerkProvider,
	SignInButton,
	SignUpButton,
	SignedIn,
	SignedOut,
} from "@clerk/nextjs";

export default async function Home() {
	const { userId } = await auth();
	console.log("userid: ", userId);

	const score = userId ? getScore(userId) : "";

	async function getScore(userId) {
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
		// calculate total score
		const myScore = data.reduce((agg, curr) => {
			return {
				total_score: Number(agg.total_score) + Number(curr.total_score),
			};
		});
		// add username
		myScore.username = data[0].username;

		console.log("Score: ", myScore);
		return myScore;
	}

	return (
		<>
			<p>Huge splash page</p>
			<SignedIn>
				<p>Cool. Youre signed in</p>
				<SparkBar score={score} />
			</SignedIn>
			<SignedOut>
				<div className="flex flex-col m-auto h-lg place-content-between">
					<SignInButton className="text-3xl border-lime-400 bg-slate-400 max-w-64 py-2 rounded-full" />
					<SignUpButton className="text-3xl border-lime-400 bg-slate-400 max-w-64 py-2 rounded-full" />
				</div>
			</SignedOut>
		</>
	);
}
