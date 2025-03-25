import { db } from "../../utils/utilities.js";

export default async function QuestionPage() {
	const questions = (await db.query(`SELECT * FROM questions`)).rows;

	console.log(questions);

	return (
		<div>
			<h1>Questions</h1>
			<ul>
				{questions.map((question, index) => (
					<li key={question.id}>
						{question.question} - Level {question.levelId}
					</li>
				))}
			</ul>
		</div>
	);
}
