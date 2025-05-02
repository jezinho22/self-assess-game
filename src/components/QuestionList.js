import Link from "next/link";
import { db } from "@/utils/utilities";

export default async function QuestionList() {
	const response =
		await db.query(`SELECT  questions.question, level.level, answers.question_id, answers.points, answers.clerkid, answers.id AS answers_id
  FROM questions JOIN answers
  ON questions.id = answers.question_id 
    JOIN level
    ON questions.level_id = level.id
    WHERE answers.clerkid = 'user_2vACEKNkmwmYXlqdO0RLp6JKzDW'
    AND answers.id = (
      SELECT a2.id
      FROM answers a2
      WHERE a2.question_id = answers.question_id
        AND a2.clerkid = answers.clerkid
      ORDER BY a2.points DESC, a2.id ASC
      LIMIT 1
    )
  ORDER BY questions.id ASC;`);
	const questions = response.rows;
	console.log(questions);
	return (
		<>
			{questions.map((question) => {
				return (
					<ul
						key={"question_" + question.answers_id}
						className="flex-row flex-nowrap"
					>
						<Link
							className="inline-block px-2 py-[1px] m-2 bg-green-500 rounded-sm border-2 border-[#ffc540]"
							href={`/selftest/${question.answers_id}`}
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
