import Link from "next/link";
import { db } from "@/utils/utilities";

import { auth, currentUser } from "@clerk/nextjs/server";

export default async function QuestionList() {
	const { userId } = await auth();
	const questions_data = await db.query(`SELECT * FROM questions`);
	const questions = questions_data.rows;
	const answers_data =
		await db.query(`SELECT  questions.question, level.level, answers.question_id, answers.points, answers.clerkid, answers.id AS answers_id
			FROM questions JOIN answers
			ON questions.id = answers.question_id 
			JOIN level
			ON questions.level_id = level.id
			WHERE answers.clerkid = '${userId}'
			AND answers.id = (
			SELECT a2.id
			FROM answers a2
			WHERE a2.question_id = answers.question_id
				AND a2.clerkid = answers.clerkid
			ORDER BY a2.points DESC, a2.id ASC
			LIMIT 1
			)
			ORDER BY questions.id ASC;`);
	const answers = answers_data.rows;

	const mapped = questions.forEach((question) => {
		const found = answers.findIndex((item) => item.question_id == question.id);
		question.points = answers[found]?.points;
		question.colour = gradedColour(question.points);
	});

	function gradedColour(points) {
		if (points < 5) {
			return "bronze";
		} else if (points < 8) {
			return "silver";
		} else if (points >= 8) {
			return "gold";
		}
	}

	return (
		<>
			{questions.map((question) => {
				return (
					<ul key={"question_" + question.id} className="flex-row flex-nowrap">
						<Link
							className={
								"inline-block px-2 py-[1px] m-2 bg-green-500 rounded-sm border-2 border-[#ffc540] " +
								question.colour
							}
							href={`/choose_question/${question.id}`}
						>
							{question.points} Try
						</Link>
						<div className="inline-block px-2 py-[1px] m-2 bg-green-500 rounded-sm">
							{question.level}
						</div>
						<div className="inline-block">{question.question}</div>
					</ul>
				);
			})}
		</>
	);
}
