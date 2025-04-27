import Link from "next/link";
import { db } from "@/utils/utilities";

export default async function QuestionList() {
	const response = await db.query(`SELECT * FROM questions`);
	const questions = response.rows;

	function handleSelect(id) {}

	return (
		<>
			{questions.map((question) => {
				return (
					<ul key={"question_" + question.id} className="flex-row flex-nowrap">
						<div className="inline-block p-[1px] m-2 bg-green-500 rounded-sm">
							{question.level_id}
						</div>
						<div className="inline-block">Question: {question.question}</div>
						<Link className="inline-block" href={`/selftest/${question.id}`}>
							Try
						</Link>
					</ul>
				);
			})}
		</>
	);
}
