import Image from "next/image";
import UsingContext from "@/components/usingContext";
import SparkBar from "@/components/SparkBar";
import { db } from "@/utils/utilities";
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function Home() {
	const { userId } = await auth();

	const response = await db.query(`SELECT 
		users.username, 
		SUM(answers.points) AS total_score
	  FROM answers 
	  JOIN users ON answers.clerkid = users.clerkid
	  WHERE users.clerkid = '${userId}'
	  GROUP BY users.username;`);
	const score = response.rows[0];

	return (
		<>
			<p>Well here we go</p>
			<SparkBar score={score.total_score} />

			<UsingContext />

			<div>Username: {score.username}</div>
			<div>My score: {score.total_score}</div>
		</>
	);
}
