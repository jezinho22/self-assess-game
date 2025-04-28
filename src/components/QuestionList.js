import Link from "next/link";
import { db } from "@/utils/utilities";

export default async function QuestionList() {
	const response =
		await db.query(`SELECT  questions.question, level.level, answers.question_id, answers.points, answers.clerkid, answers.id
         from questions join answers
         on questions.id = answers.question_id 
         join level
         on questions.level_id = level.id
         where answers.clerkid = 'user_2vACEKNkmwmYXlqdO0RLp6JKzDW'`);
	const questions = response.rows;
	console.log(questions);
	return (
		<>
			{questions.map((question) => {
				return (
					<ul
						key={"question_" + question.question_id}
						className="flex-row flex-nowrap"
					>
						<Link
							className="inline-block px-2 py-[1px] m-2 bg-green-500 rounded-sm border-2 border-[#ffc540]"
							href={`/selftest/${question.question_id}`}
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
